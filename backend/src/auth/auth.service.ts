import { Injectable, Logger } from '@nestjs/common'
import SgidClient from '@opengovsg/sgid-client'
import { ApiConfigService } from '../util'

interface SgidUserInfo {
  sub: string
  data: SgidUserInfoData
}

interface SgidUserInfoData extends Record<string, string> {
  'myinfo.nric_number': string
  'myinfo.name': string
}

interface ParsedUserInfo {
  openid: string
  nric: string
  name: string
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  private sgidClient: SgidClient
  private publicRedirect: string

  constructor(private apiConfigService: ApiConfigService) {
    this.publicRedirect = new URL(
      '/api/v1/auth/callback',
      this.apiConfigService.sgidRedirectHostname,
    ).toString()

    this.sgidClient = new SgidClient({
      clientId: this.apiConfigService.sgidClientId,
      clientSecret: this.apiConfigService.sgidClientSecret,
      privateKey: this.apiConfigService.sgidPrivateKey,
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
      this.apiConfigService.sgidScopes,
      null,
      this.publicRedirect,
    )
  }

  async handleCallback({ code }: { code: string }): Promise<ParsedUserInfo> {
    const { sub: _, accessToken } = await this.sgidClient.callback(code, null)
    const info = await this.sgidClient.userinfo(accessToken)
    return this.parseSgidInfo(info as SgidUserInfo)
  }

  parseSgidInfo(info: SgidUserInfo): ParsedUserInfo {
    const { sub: openid, data } = info
    const { 'myinfo.nric_number': nric, 'myinfo.name': name } = data
    return { openid, nric, name }
  }
}
