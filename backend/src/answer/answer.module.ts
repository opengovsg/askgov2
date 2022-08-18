import { Module } from '@nestjs/common'
import { AnswerService } from './answer.service'
import { AnswerController } from './answer.controller'
import { UtilModule } from '../util'
import { AuthModule } from '../auth'
import { OfficerModule } from '../officer'

@Module({
  imports: [UtilModule, AuthModule, OfficerModule],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
