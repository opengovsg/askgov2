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
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request } from 'express'
import { UserService, User } from '../user'
import { ApiConfigService } from '../util'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  private readonly logger = new Logger(AuthController.name)
  constructor(
    private apiConfigService: ApiConfigService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get('url')
  getUserAuthUrl(): { url: string } {
    return this.authService.getAuthUrl()
  }

  @Get('whoami')
  async getUserInfo(
    @Session() session: Request['session'],
  ): Promise<{ currentUser: User | null }> {
    const userId = session?.userId
    const currentUser = userId
      ? await this.userService.findOne({ where: { id: userId } })
      : null

    if (currentUser === null) {
      return { currentUser: null }
    }
    // Look up and return user data here
    return { currentUser: currentUser }
  }

  // Handles both user registration and user log in
  // ToDo: Refactor this to handle redirect with express response.
  // Using the decorator does not allow us to take advantage of ApiConfigService.
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

  @Post('logout')
  async logout(@Session() session: Request['session']): Promise<void> {
    if (session) {
      session.userId = undefined
    }
  }
}
