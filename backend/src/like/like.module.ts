import { Module } from '@nestjs/common'
import { QuestionUpperService } from './question-upper.service'
import { QuestionDownerService } from './question-downer.service'
import { AnswerUpperService } from './answer-upper.service'
import { AnswerDownerService } from './answer-downer.service'
import { LikeController } from './like.controller'
import { UtilModule } from '../util'
import { AuthModule } from '../auth'
import { LikeService } from './like.service'
import { QuestionModule } from '../question'
import { AnswerModule } from '../answer'

@Module({
  imports: [UtilModule, AuthModule, QuestionModule, AnswerModule],
  controllers: [LikeController],
  providers: [
    QuestionUpperService,
    QuestionDownerService,
    AnswerUpperService,
    AnswerDownerService,
    LikeService,
  ],
  exports: [AnswerUpperService],
})
export class LikeModule {}
