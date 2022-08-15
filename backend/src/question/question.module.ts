import { Module } from '@nestjs/common'
import { QuestionService } from './question.service'
import { QuestionController } from './question.controller'
import { UtilModule } from '../util'
import { AuthModule } from '../auth'
import { TagModule } from '../tag'

@Module({
  imports: [UtilModule, TagModule, AuthModule],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
