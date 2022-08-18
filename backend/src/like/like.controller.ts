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
  UseGuards,
} from '@nestjs/common'
import { Request } from 'express'
import { LikeService } from './like.service'
import { UserGuard } from '../auth'

@Controller({ path: 'like', version: '1' })
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('question/:questionId/up')
  @UseGuards(UserGuard)
  upQuestion(
    @Session() session: Request['session'],
    @Param('questionId') questionId: number,
  ) {
    const userId = session.userId! // Guard ensures this is valid.
    return this.likeService.upQuestion(userId, questionId)
  }

  @Post('question/:questionId/down')
  @UseGuards(UserGuard)
  downQuestion(
    @Session() session: Request['session'],
    @Param('questionId') questionId: number,
  ) {
    const userId = session.userId! // Guard ensures this is valid.
    return this.likeService.downQuestion(userId, questionId)
  }

  @Post('answer/:answerId/up')
  @UseGuards(UserGuard)
  upAnswer(
    @Session() session: Request['session'],
    @Param('answerId') answerId: number,
  ) {
    const userId = session.userId! // Guard ensures this is valid.
    return this.likeService.upAnswer(userId, answerId)
  }

  @Post('answer/:answerId/down')
  @UseGuards(UserGuard)
  downAnswer(
    @Session() session: Request['session'],
    @Param('answerId') answerId: number,
  ) {
    const userId = session.userId! // Guard ensures this is valid.
    return this.likeService.downAnswer(userId, answerId)
  }
}
