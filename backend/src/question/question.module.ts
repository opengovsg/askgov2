import { Module } from '@nestjs/common'
import { QuestionService } from './question.service'
import { QuestionController } from './question.controller'
import { UtilModule } from '../util'

@Module({
  imports: [UtilModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
