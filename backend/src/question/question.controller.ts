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
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import {
  QuestionService,
  Question,
  ScreenState,
  QuestionWhereInput,
  matchScreenState,
  QuestionSelect,
  AnswerSelect,
} from './question.service'

import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { Request } from 'express'
import { AuthGuard } from '../auth/auth.guard'

@Controller({ path: 'question', version: '1' })
export class QuestionController {
  private readonly logger = new Logger(QuestionController.name)
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(new AuthGuard())
  create(
    @Session() session: Request['session'],
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    const userId = session.userId! // Guard ensures this is valid.
    if (userId === undefined) {
      throw new UnauthorizedException('Must log in to create a question')
    }
    return this.questionService.create({
      ...createQuestionDto,
      author: { connect: { id: userId } },
    })
  }

  @Get()
  findAll(
    @Session() session: Request['session'],
    @Query('screenState') screenState?: string,
  ) {
    const { userId } = session
    let where: QuestionWhereInput | undefined = undefined
    if (screenState !== undefined) {
      const match = matchScreenState(screenState)
      if (match) {
        where = { screenState: matchScreenState(screenState) }
      } else {
        throw new HttpException(
          'Invalid screenState query parameter',
          HttpStatus.BAD_REQUEST,
        )
      }
    }

    let questionSelect: QuestionSelect = {
      id: true,
      body: true,
      createdAt: true,
      authorId: true,
      _count: {
        select: {
          uppedBy: true,
          downedBy: true,
        },
      },
    }

    let answerSelect: AnswerSelect = {
      id: true,
      body: true,
      createdAt: true,
      _count: {
        select: {
          uppedBy: true,
          downedBy: true,
        },
      },
    }

    if (userId) {
      answerSelect.uppedBy = {
        where: { userId },
        select: {
          createdAt: true,
        },
      }
      answerSelect.downedBy = {
        where: { userId },
        select: {
          createdAt: true,
        },
      }
      questionSelect.uppedBy = {
        where: { userId },
        select: {
          createdAt: true,
        },
      }
      questionSelect.downedBy = {
        where: { userId },
        select: {
          createdAt: true,
        },
      }
    }

    questionSelect.answers = {
      select: answerSelect,
    }

    const found = this.questionService.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: questionSelect,
    })

    return found
    // return found.map((question) => {
    //   const { id, body, screenState, createdAt, updatedAt, authorId, include } = question
    //   return {id: q.id, body, screenState, createdAt: }
    // })
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    if (id > 0) {
      return this.questionService.findOne({
        where: { id },
        include: { answers: true },
      })
    }
    throw new HttpException('Invalid question id', HttpStatus.BAD_REQUEST)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    // return this.questionService.update(+id, updateQuestionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.questionService.remove(+id)
  }
}
