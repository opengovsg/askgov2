import { Module } from '@nestjs/common'
import { QuestionService } from './question.service'
import { QuestionController } from './question.controller'
import { UtilModule } from '../util'
import { AuthModule } from '../auth'
import { TagModule } from '../tag'
import { OfficerModule } from '../officer'

@Module({
  imports: [UtilModule, TagModule, AuthModule, OfficerModule],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
