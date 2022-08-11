import { Module } from '@nestjs/common'
import { AnswerService } from './answer.service'
import { AnswerController } from './answer.controller'
import { UtilModule } from '../util'
import { AuthModule } from '../auth'

@Module({
  imports: [UtilModule, AuthModule],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
