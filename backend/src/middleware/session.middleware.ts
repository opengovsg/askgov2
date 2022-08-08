import { Injectable, NestMiddleware } from '@nestjs/common'
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
  private middleware: RequestHandler

  constructor(
    private prisma: PrismaService,
    private apiConfigService: ApiConfigService,
  ) {
    this.middleware = session({
      resave: false,
      saveUninitialized: false,
      secret: this.apiConfigService.sessionSecret,
      name: this.apiConfigService.sessionName,
      cookie: {
        httpOnly: true,
        sameSite: 'strict',
        domain: this.apiConfigService.appDomain,
        maxAge: this.apiConfigService.sessionMaxAge,
        secure: this.apiConfigService.sessionSecure, // disable in local dev env
      },
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
