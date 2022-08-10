import { Module } from '@nestjs/common'
import { QuestionUpperService } from './question-upper.service'
import { QuestionDownerService } from './question-downer.service'
import { AnswerUpperService } from './answer-upper.service'
import { AnswerDownerService } from './answer-downer.service'
import { LikeController } from './like.controller'
import { UtilModule } from '../util'

@Module({
  imports: [UtilModule],
  controllers: [LikeController],
  providers: [
    QuestionUpperService,
    QuestionDownerService,
    AnswerUpperService,
    AnswerDownerService,
  ],
  exports: [AnswerUpperService],
})
export class LikeModule {}
