import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  Logger,
  Session,
  UseGuards,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'
import {
  QuestionService,
  QuestionWhereInput,
  matchScreenState,
  QuestionSelect,
  QuestionInclude,
  ScreenState,
} from './question.service'
import { AnswerInclude } from '../answer'

import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { Request } from 'express'
import { OfficerGuard, ScreenPermission, UserGuard } from '../auth'
import { Tag } from '../tag'
import { OfficerService } from '../officer'
import { Question } from '@prisma/client'

@Controller({ path: 'question', version: '1' })
export class QuestionController {
  private readonly logger = new Logger(QuestionController.name)
  constructor(
    private readonly questionService: QuestionService,
    private readonly officerService: OfficerService,
  ) {}

  @Post()
  @UseGuards(UserGuard)
  create(
    @Session() session: Request['session'],
    @Body() data: CreateQuestionDto,
    @Query('tag') tags?: string | string[],
  ) {
    const userId = session.userId! // Guard ensures this is valid.

    // return this.questionService.create({
    //   body: data.body,
    //   author: { connect: { id: userId } },
    // })
    return this.questionService.createFromDto(data, userId, tags)
  }

  @Get()
  @ScreenPermission()
  @UseGuards(OfficerGuard)
  async findMany(
    @Session() session: Request['session'],
    @Query('tag') tagQuery?: string | string[],
    @Query('screenState') screenState?: string,
  ) {
    const { userId } = session
    return this.questionService.findByTagAndScreenState(
      userId,
      tagQuery,
      screenState,
    )
  }

  @Get('approved')
  async findApproved(
    @Session() session: Request['session'],
    @Query('tag') tagQuery?: string | string[],
  ) {
    const { userId } = session
    return this.questionService.findByTagAndScreenState(
      userId,
      tagQuery,
      ScreenState.APPROVED,
    )
  }

  @Get(':id')
  async findOne(
    @Session() session: Request['session'],
    @Param('id') id: number,
  ) {
    const { userId, officerId } = session
    let question: Question | null = null
    try {
      let include: QuestionInclude = {
        tags: {
          select: {
            tag: true,
          },
        },
        _count: {
          select: {
            answers: true,
            uppedBy: true,
            downedBy: true,
          },
        },
      }

      let answerInclude: AnswerInclude = {
        _count: {
          select: {
            uppedBy: true,
            downedBy: true,
          },
        },
      }

      if (userId) {
        answerInclude.uppedBy = {
          where: { userId },
          select: {
            createdAt: true,
          },
        }
        answerInclude.downedBy = {
          where: { userId },
          select: {
            createdAt: true,
          },
        }
        include.uppedBy = {
          where: { userId },
          select: {
            createdAt: true,
          },
        }
        include.downedBy = {
          where: { userId },
          select: {
            createdAt: true,
          },
        }
      }

      include.answers = {
        include: answerInclude,
      }
      question = await this.questionService.findOne(id, include)
    } catch (e) {
      throw new BadRequestException(e, 'Invalid question id')
    }

    if (
      question &&
      question.screenState !== ScreenState.APPROVED &&
      !(await this.officerService.canScreen(officerId))
    ) {
      this.logger.warn(
        `Unautorized attempt to view question (questionId:${question.id}, officerId:${officerId}, userId:${userId}`,
      )
      throw new UnauthorizedException()
    }
    return question
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    // return this.questionService.update(+id, updateQuestionDto)
  }

  @Patch(':id/screen')
  @ScreenPermission()
  @UseGuards(OfficerGuard)
  updateScreenState(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, {
      screenState: updateQuestionDto.screenState,
    })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.questionService.remove(+id)
  }
}
