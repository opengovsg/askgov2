import { Injectable, NestMiddleware } from '@nestjs/common'
import session from 'express-session'
import { PrismaService } from '../util'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'

const SESSION_SECRET = 'Slartibartfast'
const SESSION_NAME = 'CanAskGovSession'
const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000 // ms
const SESSION_SECURE = false
const SESSION_CHECK_PERIOD = 2 * 60 * 1000 //ms

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

  constructor(private prisma: PrismaService) {
    this.middleware = session({
      resave: false,
      saveUninitialized: false,
      secret: SESSION_SECRET,
      name: SESSION_NAME,
      cookie: {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: SESSION_MAX_AGE,
        secure: SESSION_SECURE, // disable in local dev env
      },
      store: new PrismaSessionStore(prisma, {
        checkPeriod: SESSION_CHECK_PERIOD, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    })
  }

  use(req: Request, res: Response, next: NextFunction): void {
    this.middleware(req, res, next)
  }
}
