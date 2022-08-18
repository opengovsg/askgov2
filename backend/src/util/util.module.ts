import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma.service'
import { ApiConfigService } from './api-config.service'
import { OtpService } from './otp.service'
import { MailerService } from './mail.service'

@Module({
  imports: [ConfigModule],
  providers: [ApiConfigService, PrismaService, OtpService, MailerService],
  exports: [ApiConfigService, PrismaService, OtpService, MailerService],
})
export class UtilModule {}
