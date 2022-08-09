import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import session from 'express-session'
import { ApiConfigService, PrismaService } from '../util'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'

export interface UserSession {
  userId?: number
}

declare module 'express-session' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface SessionData extends UserSession {}
}

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private readonly logger = new Logger(SessionMiddleware.name)
  private middleware: RequestHandler

  constructor(
    private prisma: PrismaService,
    private apiConfigService: ApiConfigService,
  ) {
    const cookie: session.CookieOptions = {
      httpOnly: true,
      sameSite: this.apiConfigService.sessionSameSite,
      domain: this.apiConfigService.sessionDomain,
      maxAge: this.apiConfigService.sessionMaxAge,
      secure: this.apiConfigService.sessionSecure, // disable in local dev env
    }
    this.logger.log(`cookie: ${JSON.stringify(cookie, null, 2)}`)

    this.middleware = session({
      resave: false,
      saveUninitialized: false,
      secret: this.apiConfigService.sessionSecret,
      name: this.apiConfigService.sessionName,
      cookie,
      store: new PrismaSessionStore(prisma, {
        checkPeriod: this.apiConfigService.sessionCheckPeriod, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    })
  }

  use(req: Request, res: Response, next: NextFunction): void {
    this.middleware(req, res, next)
  }
}
