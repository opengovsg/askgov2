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

@Controller({ path: 'question', version: '1' })
export class QuestionController {
  private readonly logger = new Logger(QuestionController.name)
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Session() session: Request['session'],
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    const userId = session.userId! // Guard ensures this is valid.
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

    // let answerSelect: AnswerSelect = {
    //   id: true,
    //   body: true,
    //   createdAt: true,
    //   _count: {
    //     select: {
    //       uppedBy: true,
    //       downedBy: true,
    //     },
    //   },
    // }

    if (userId) {
      // answerSelect.uppedBy = {
      //   where: { userId },
      //   select: {
      //     createdAt: true,
      //   },
      // }
      // answerSelect.downedBy = {
      //   where: { userId },
      //   select: {
      //     createdAt: true,
      //   },
      // }
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

    // questionSelect.answers = {
    //   select: answerSelect,
    // }

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
  findOne(@Session() session: Request['session'], @Param('id') id: number) {
    const { userId } = session
    try {
      let include: QuestionInclude = {
        _count: {
          select: {
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
