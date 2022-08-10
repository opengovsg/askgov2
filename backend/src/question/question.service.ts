import { Injectable, Logger } from '@nestjs/common'
import { Prisma, Question, ScreenState } from '@prisma/client'
import { PrismaService } from '../util'

// re-export types used by service interface
export { Question, ScreenState } from '@prisma/client'
export type QuestionWhereUniqueInput = Prisma.QuestionWhereUniqueInput
export type QuestionCreateInput = Prisma.QuestionCreateInput
export type QuestionWhereInput = Prisma.QuestionWhereInput
export type QuestionOrderByWithRelationAndSearchRelevanceInput =
  Prisma.QuestionOrderByWithRelationAndSearchRelevanceInput
export type QuestionUpdateInput = Prisma.QuestionUpdateInput
export type QuestionInclude = Prisma.QuestionInclude
export type QuestionSelect = Prisma.QuestionSelect

export type AnswerSelect = Prisma.AnswerSelect
export type AnswerInclude = Prisma.AnswerInclude

// This method works for Typescript string enums, and it appears that this is what Prisma enums are.
export function matchScreenState(value: string): ScreenState | undefined {
  return Object.values(ScreenState).find((v) => v === value)
}

@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name)
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
    select?: QuestionSelect
  }) {
    return this.prisma.question.findMany(params)
  }

  findOne(id: number, include?: QuestionInclude) {
    return this.prisma.question.findUnique({ where: { id }, include })
  }

  findOneSelect(id: number, select: QuestionSelect) {
    return this.prisma.question.findUnique({ where: { id }, select })
  }

  findOneWhere(params: {
    where: QuestionWhereUniqueInput
    include?: QuestionInclude
  }): Promise<Question | null> {
    return this.prisma.question.findUnique(params)
  }

  update(id: number, data: QuestionUpdateInput): Promise<Question> {
    return this.prisma.question.update({ where: { id }, data })
  }

  updateWhere(params: {
    where: QuestionWhereUniqueInput
    data: QuestionUpdateInput
  }): Promise<Question> {
    return this.prisma.question.update(params)
  }

  remove(id: number): Promise<Question> {
    return this.prisma.question.delete({ where: { id } })
  }

  removeWhere(where: QuestionWhereUniqueInput): Promise<Question> {
    return this.prisma.question.delete({ where })
  }
}
