import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Session,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request } from 'express'
import 'express-session'

export interface UserSession {
  userId: number
}

declare module 'express-session' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface SessionData extends UserSession {}
}

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('url')
  getUserAuthUrl(): { url: string } {
    return this.authService.getAuthUrl()
  }

  @Get('whoami')
  async getUserInfo(@Session() session: Request['session']): Promise<string> {
    const userId = session?.userId
    if (!userId) {
      return 'No user'
    }
    // Look up and return user data here
    return `userId: ${userId}`
  }

  // Handles both user registration and user log in
  @Get('callback')
  @Redirect('http://localhost:3000')
  async handleCallback(
    @Session() session: Request['session'],
    @Query('code') code: string,
    @Query('state') state: string,
  ): Promise<void> {
    // const userInfo = await this.authService.handleCallback({ code })

    // Insert user into database and return id

    // const id = await this.userService.upsertUser({
    //   uin: userInfo.uin,
    //   name: userInfo.name,
    //   dob: userInfo.dob ? new Date(userInfo.dob) : undefined,
    //   metadata: { myinfo: true },
    // })
    // Assign user id to session
    session.userId = 1
  }

  @Post('logout')
  async logout(@Session() session: Request['session']): Promise<void> {
    if (session) {
      session.userId = undefined
    }
  }
}
