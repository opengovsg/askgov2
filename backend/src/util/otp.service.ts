import { Injectable } from '@nestjs/common'
import { totp as totpFactory } from 'otplib'

import { ApiConfigService } from './api-config.service'

const NUM_MINUTES_IN_AN_HOUR = 60

@Injectable()
export class OtpService {
  constructor(private apiConfigService: ApiConfigService) {}

  private totp = totpFactory.clone({
    step: this.apiConfigService.otpExpiry, // Seconds before OTP expires
    window: [
      // How many windows (x * step) past and future do we consider as valid during check.
      this.apiConfigService.otpNumValidPastWindows,
      this.apiConfigService.otpNumValidFutureWindows,
    ],
  })

  private concatSecretWithEmail(email: string): string {
    return this.apiConfigService.otpSecret + email
  }

  generateOtp(email: string): { token: string; timeLeft: number } {
    const token = this.totp.generate(this.concatSecretWithEmail(email))
    const timeLeft = this.totp.options.step
      ? Math.floor(this.totp.options.step / NUM_MINUTES_IN_AN_HOUR) // Round down to minutes
      : NaN
    return { token, timeLeft }
  }

  verifyOtp(email: string, token: string): boolean {
    return this.totp.verify({
      secret: this.concatSecretWithEmail(email),
      token,
    })
  }
}
