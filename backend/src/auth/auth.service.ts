import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import SgidClient from '@opengovsg/sgid-client'
import {
  ApiConfigService,
  OtpService,
  MailerService,
  MailOptions,
  asErr,
} from '../util'
import { GenerateOtpDto, VerifyOtpDto } from './dto/otp.dto'
import { Officer } from '@prisma/client'
import { UserService } from '../user'
import { OfficerService } from '../officer'
import { ApiInputError } from 'postmark/dist/client/errors'

interface SgidUserInfo {
  sub: string
  data: SgidUserInfoData
}

// const SGID_SCOPES = ['openid', 'myinfo.name', 'myinfo.nric_number']
const SGID_SCOPES = ['openid', 'myinfo.name']
// const SGID_SCOPES = ['openid']

interface SgidUserInfoData extends Record<string, string> {
  'myinfo.nric_number': string
  'myinfo.name': string
}

interface ParsedUserInfo {
  openid: string
  // nric: string
  // name: string
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  private sgidClient: SgidClient

  constructor(
    private apiConfigService: ApiConfigService,
    private userService: UserService,
    private officerService: OfficerService,
    private otpService: OtpService,
    private mailerService: MailerService,
  ) {
    this.sgidClient = new SgidClient({
      clientId: this.apiConfigService.sgidClientId,
      clientSecret: this.apiConfigService.sgidClientSecret,
      privateKey: this.apiConfigService.sgidPrivateKey,
      // Client requires at least a default uri to be registered
      redirectUri: this.apiConfigService.sgidRedirectUrl,
      // hostname: SGID_HOSTNAME,
    })
  }

  getAuthUrl(returnTo: string): {
    url: string
  } {
    return this.sgidClient.authorizationUrl(
      returnTo,
      SGID_SCOPES,
      null,
      this.apiConfigService.sgidRedirectUrl,
    )
  }

  async handleCallback({ code }: { code: string }): Promise<ParsedUserInfo> {
    const { sub: _, accessToken } = await this.sgidClient.callback(code, null)
    const info = await this.sgidClient.userinfo(accessToken)
    return this.parseSgidInfo(info as SgidUserInfo)
  }

  parseSgidInfo(info: SgidUserInfo): ParsedUserInfo {
    const { sub: openid, data } = info
    // const { 'myinfo.nric_number': nric, 'myinfo.name': name } = data
    // return { openid, nric, name }
    return { openid }
  }

  async generateOtp(generateOtpDto: GenerateOtpDto): Promise<void> {
    const { email } = generateOtpDto
    if (email.slice(-7) !== '.gov.sg') {
      throw new BadRequestException("Email addresses must end in '.gov.sg'.")
    }
    const { token, timeLeft } = this.otpService.generateOtp(email)

    const html = `Your OTP is <b>${token}</b>. It will expire in ${timeLeft} minutes.
    Please use this to login to your account.
    <p>If your OTP does not work, please request a new one.</p>`

    const mail: MailOptions = {
      To: email,
      From: 'AskGov <admin@ask.gov.sg>',
      Subject: 'One-Time Password (OTP) for AskGov',
      HtmlBody: html,
    }

    this.logger.log(`Sending mail to ${email}`)
    await this.mailerService.sendMail(mail)
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<Officer | undefined> {
    const { email, token } = verifyOtpDto
    const isVerified = this.otpService.verifyOtp(email, token)
    return isVerified
      ? await this.officerService.upsert({
          select: { id: true, email: true },
          where: { email },
          update: {},
          create: {
            email,
          },
        })
      : undefined
  }
}
