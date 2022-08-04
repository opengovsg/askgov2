import { Injectable, Logger } from '@nestjs/common'
import SgidClient from '@opengovsg/sgid-client'

const SGID_SCOPES = ['openid', 'myinfo.name', 'myinfo.nric_number']
const {
  SGID_CLIENT_ID,
  SGID_CLIENT_SECRET,
  SGID_PRIVATE_KEY,
  SGID_REDIRECT_HOSTNAME,
  SGID_HOSTNAME,
} = process.env

// Borrowed from datagovsg/phas
interface SgidUserInfo extends Record<string, string> {
  sub: string
  'myinfo.nric_number': string
  'myinfo.name': string
}

interface ParsedUserInfo {
  uin: string
  name: string
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  private sgidClient: SgidClient
  private publicRedirect: string

  constructor() {
    this.publicRedirect = new URL(
      '/api/v1/sgid/callback',
      SGID_REDIRECT_HOSTNAME,
    ).toString()
    this.logger.log(this.publicRedirect)
    this.sgidClient = new SgidClient({
      clientId: SGID_CLIENT_ID!,
      clientSecret: SGID_CLIENT_SECRET!,
      privateKey: SGID_PRIVATE_KEY!,
      // Client requires at least a default uri to be registered
      redirectUri: this.publicRedirect,
      // hostname: SGID_HOSTNAME,
    })
  }

  getAuthUrl(): {
    url: string
  } {
    return this.sgidClient.authorizationUrl(
      'state',
      SGID_SCOPES,
      null,
      // this.publicRedirect,
    )
  }

  async handleCallback({
    code,
  }: {
    code: string
    isAdminLogin?: boolean
  }): Promise<ParsedUserInfo> {
    const { sub, accessToken } = await this.sgidClient.callback(code, null)
    console.log(
      `callback:\nsub: '${sub}\naccessToken:\n${JSON.stringify(accessToken)}`,
    )
    const { sub: sub2, data } = await this.sgidClient.userinfo(accessToken)
    console.log(`callback:\nsub: '${sub2}\ndata:\n${JSON.stringify(data)}`)
    return this.parseSgidInfo(data as SgidUserInfo)
  }

  parseSgidInfo(data: SgidUserInfo): ParsedUserInfo {
    const { 'myinfo.nric_number': uin, 'myinfo.name': name } = data
    return { uin, name }
  }
}
