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
} from '@nestjs/common'
import {
  QuestionService,
  Question,
  ScreenState,
  QuestionWhereInput,
  matchScreenState,
} from './question.service'

import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { Request } from 'express'

@Controller({ path: 'question', version: '1' })
export class QuestionController {
  private readonly logger = new Logger(QuestionController.name)
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(
    @Session() session: Request['session'],
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    const { userId } = session
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
  ): Promise<Question[]> {
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
    this.logger.log(`userId: ${session.userId}`)
    return this.questionService.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })
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
