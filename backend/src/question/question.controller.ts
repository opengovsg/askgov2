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
} from '@nestjs/common'
import {
  QuestionService,
  QuestionWhereInput,
  matchScreenState,
  QuestionSelect,
  QuestionInclude,
} from './question.service'
import { AnswerInclude } from '../answer'

import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { Request } from 'express'
import { AuthGuard } from '../auth'
import { Tag } from '../tag'

@Controller({ path: 'question', version: '1' })
export class QuestionController {
  private readonly logger = new Logger(QuestionController.name)
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(AuthGuard)
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
  async findAll(
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

  @Get(':id')
  findOne(@Session() session: Request['session'], @Param('id') id: number) {
    const { userId } = session
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

      return this.questionService.findOne(id, include)
    } catch (e) {
      throw new BadRequestException(e, 'Invalid question id')
    }
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
