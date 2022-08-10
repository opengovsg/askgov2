import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  UnauthorizedException,
  Query,
} from '@nestjs/common'
import { Request } from 'express'
import { QuestionUpperService } from './question-upper.service'
import { QuestionDownerService } from './question-downer.service'
import { AnswerUpperService } from './answer-upper.service'
import { AnswerDownerService } from './answer-downer.service'

@Controller('like')
export class LikeController {
  constructor(
    private readonly questionUpperService: QuestionUpperService,
    private readonly questionDownerService: QuestionDownerService,
    private readonly answerUpperService: AnswerUpperService,
    private readonly answerDownerService: AnswerDownerService,
  ) {}

  @Post('question/:questionId/up')
  upQuestion(
    @Session() session: Request['session'],
    @Param('questionId') questionId: number,
  ) {
    const { userId } = session
    if (userId === undefined) {
      throw new UnauthorizedException('Must log in to like a question')
    }
    return this.questionUpperService.upsert(userId, questionId)
  }

  @Post('question/:questionId/down')
  downQuestion(
    @Session() session: Request['session'],
    @Param('questionId') questionId: number,
  ) {
    const { userId } = session
    if (userId === undefined) {
      throw new UnauthorizedException('Must log in to like a question')
    }
    return this.questionUpperService.upsert(userId, questionId)
  }

  @Get('question/:questionId')
  findOneQuestion(
    @Session() session: Request['session'],
    @Param('questionId') questionId: number,
  ) {
    const { userId } = session
    if (userId === undefined) {
      throw new UnauthorizedException('Must log in to like a question')
    }
    return this.questionUpperService.findOne(+questionId, userId, {})
  }

  @Delete('question/:questionId')
  removeQuestion(
    @Session() session: Request['session'],
    @Param('questionId') questionId: number,
  ) {
    const { userId } = session
    if (userId === undefined) {
      throw new UnauthorizedException('Must log in to like a question')
    }
    return this.questionUpperService.findOne(+questionId, userId, {})
  }
}
