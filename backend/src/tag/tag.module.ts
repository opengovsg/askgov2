import { Module } from '@nestjs/common'
import { TagService } from './tag.service'
import { TagController } from './tag.controller'
import { UtilModule } from '../util'
import { AuthModule } from '../auth'

@Module({
  imports: [UtilModule, AuthModule],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
