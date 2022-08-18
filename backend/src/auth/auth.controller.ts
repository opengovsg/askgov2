import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Post,
  Query,
  Redirect,
  Session,
  UnauthorizedException,
} from '@nestjs/common'
import { GenerateOtpDto, VerifyOtpDto } from './dto/otp.dto'
import { AuthService } from './auth.service'
import { Request } from 'express'
import { UserService, User } from '../user'
import { OfficerService, Officer } from '../officer'
import { ApiConfigService } from '../util'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  private readonly logger = new Logger(AuthController.name)
  constructor(
    private apiConfigService: ApiConfigService,
    private authService: AuthService,
    private userService: UserService,
    private officerService: OfficerService,
  ) {}

  @Get('url')
  getUserAuthUrl(@Query('returnTo') returnTo: string): { url: string } {
    return this.authService.getAuthUrl(returnTo)
  }

  // Handles both user registration and user log in
  @Get('callback')
  async handleCallback(
    @Session() session: Request['session'],
    @Query('code') code: string,
    @Query('state') state: string,
  ): Promise<{ userId: number | undefined }> {
    const { openid /*, nric, name */ } = await this.authService.handleCallback({
      code,
    })

    // Insert user into database and return id
    const user = await this.userService.upsert({
      select: { id: true },
      where: { openid },
      update: {
        // nric,
        // name,
      },
      create: {
        openid,
        // nric,
        // name,
      },
    })

    session.userId = user.id
    return { userId: user.id }
  }

  @Post('otp/generate')
  async generateOtp(@Body() generateOtpDto: GenerateOtpDto): Promise<void> {
    await this.authService.generateOtp(generateOtpDto)
  }

  @Post('otp/verify')
  async verifyOtp(
    @Session() session: Request['session'],
    @Body() verifyOtpDto: VerifyOtpDto,
  ) {
    const officer = await this.authService.verifyOtp(verifyOtpDto)
    if (officer) {
      session.officerId = officer.id
      this.logger.log(
        `Successfully verified OTP for user ${verifyOtpDto.email}`,
      )
      return { officerId: officer.id }
    } else {
      this.logger.warn(`Incorrect OTP given for ${verifyOtpDto.email}`)
      throw new UnauthorizedException('Incorrect OTP given')
    }
  }

  @Get('whoami')
  async getUserInfo(
    @Session() session: Request['session'],
  ): Promise<{ currentUser: User | null; currentOfficer: Officer | null }> {
    const userId = session?.userId
    const officerId = session?.officerId
    const currentUser = userId
      ? await this.userService.findOne({ where: { id: userId } })
      : null
    const currentOfficer = officerId
      ? await this.officerService.findOne({
          where: { id: officerId },
          include: { permissions: true },
        })
      : null

    return { currentUser, currentOfficer }
  }

  @Post('logout')
  async logout(@Session() session: Request['session']): Promise<void> {
    if (session) {
      session.userId = undefined
      session.officerId = undefined
    }
  }

  @Post('logout/user')
  async logoutUser(@Session() session: Request['session']): Promise<void> {
    if (session) {
      session.userId = undefined
    }
  }

  @Post('logout/officer')
  async logoutOfficer(@Session() session: Request['session']): Promise<void> {
    if (session) {
      session.officerId = undefined
    }
  }
}
