import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Session,
  Query,
} from '@nestjs/common'
import { AnswerService } from './answer.service'
import { CreateAnswerDto } from './dto/create-answer.dto'
import { UpdateAnswerDto } from './dto/update-answer.dto'
import { OfficerGuard, AnswerPermission } from '../auth'
import { Request } from 'express'

@Controller({ path: 'answer', version: '1' })
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @AnswerPermission()
  @UseGuards(OfficerGuard)
  create(
    @Session() session: Request['session'],
    @Body() data: CreateAnswerDto,
    @Query('tag') tags?: string | string[],
  ) {
    const officerId = session.officerId! // Guard ensures this is valid.

    // return this.questionService.create({
    //   body: data.body,
    //   author: { connect: { id: userId } },
    // })
    return this.answerService.createFromDto(data, officerId)
  }
  // @Get()
  // findAll() {
  //   return this.answerService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.answerService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
  //   return this.answerService.update(+id, updateAnswerDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.answerService.remove(+id);
  // }
}
