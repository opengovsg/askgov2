import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma.service'
import { ApiConfigService } from './api-config.service'

@Module({
  imports: [ConfigModule],
  providers: [ApiConfigService, PrismaService],
  exports: [ApiConfigService, PrismaService],
})
export class UtilModule {}
