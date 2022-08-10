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
import { AuthGuard } from '../auth'

@Controller({ path: 'like', version: '1' })
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('question/:questionId/up')
  @UseGuards(AuthGuard)
  upQuestion(
    @Session() session: Request['session'],
    @Param('questionId') questionId: number,
  ) {
    const userId = session.userId! // Guard ensures this is valid.
    return this.likeService.upQuestion(userId, questionId)
  }

  @Post('question/:questionId/down')
  @UseGuards(AuthGuard)
  downQuestion(
    @Session() session: Request['session'],
    @Param('questionId') questionId: number,
  ) {
    const userId = session.userId! // Guard ensures this is valid.
    return this.likeService.downQuestion(userId, questionId)
  }
}
