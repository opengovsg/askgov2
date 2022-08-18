import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { ServerClient, Message } from 'postmark'

import { ApiConfigService } from './api-config.service'
import { PostmarkError } from 'postmark/dist/client/errors'
import { asHttpErr } from './util'

export interface MailOptions {
  From: string
  To: string
  Subject: string
  HtmlBody: string
}

export interface MailResponse {
  To?: string
  Cc?: string
  Bcc?: string
  Message: string
  MessageID: string
  SubmittedAt: string
  ErrorCode: number
}

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name)
  postmarkClient: ServerClient

  constructor(private apiConfigService: ApiConfigService) {
    this.postmarkClient = new ServerClient(
      this.apiConfigService.postmarkApiToken,
    )
  }

  sendMail = async (mailOptions: Message): Promise<MailResponse> => {
    if (this.apiConfigService.isDevelopment || this.apiConfigService.isTest) {
      this.logger.log(`sendMail(${JSON.stringify(mailOptions, null, 2)})`)
    }
    try {
      return await this.postmarkClient.sendEmail(mailOptions)
    } catch (e) {
      if (e instanceof PostmarkError) {
        this.logger.error(
          `Postmark '${e.name}': [statusCode=${e.statusCode}, code=${e.code}] ${e.message}`,
        )
        throw new InternalServerErrorException(e, 'Postmark error')
      }
      this.logger.error(`Postmark error '${e}'`)
      throw asHttpErr(e)
    }
  }
}
