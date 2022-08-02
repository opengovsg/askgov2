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
} from '@nestjs/common'
import { QuestionService, Question } from './question.service'

import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'

@Controller({ path: 'question', version: '1' })
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto)
  }

  @Get()
  findAll(): Promise<Question[]> {
    return this.questionService.findMany({})
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
