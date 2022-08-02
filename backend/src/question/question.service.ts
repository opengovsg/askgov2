import { Injectable } from '@nestjs/common'
import { Prisma, Question } from '@prisma/client'
import { PrismaService } from '../util'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'

// re-export types used by service interface
export { Question } from '@prisma/client'
export type QuestionWhereUniqueInput = Prisma.QuestionWhereUniqueInput
export type QuestionCreateInput = Prisma.QuestionCreateInput
export type QuestionWhereInput = Prisma.QuestionWhereInput
export type QuestionOrderByWithRelationAndSearchRelevanceInput =
  Prisma.QuestionOrderByWithRelationAndSearchRelevanceInput
export type QuestionUpdateInput = Prisma.QuestionUpdateInput
export type QuestionInclude = Prisma.QuestionInclude

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  create(data: QuestionCreateInput): Promise<Question> {
    return this.prisma.question.create({
      data,
    })
  }

  findMany(params: {
    skip?: number
    take?: number
    cursor?: QuestionWhereUniqueInput
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithRelationAndSearchRelevanceInput
    include?: QuestionInclude
  }) {
    return this.prisma.question.findMany(params)
  }

  findOne(params: {
    where: QuestionWhereUniqueInput
    include?: QuestionInclude
  }): Promise<Question | null> {
    return this.prisma.question.findUnique(params)
  }

  update(params: {
    where: QuestionWhereUniqueInput
    data: QuestionUpdateInput
  }): Promise<Question> {
    return this.prisma.question.update(params)
  }

  remove(where: QuestionWhereUniqueInput): Promise<Question> {
    return this.prisma.question.delete({ where })
  }
}
