import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../util'
import { Prisma, AnswerDowner, QuestionUpper } from '@prisma/client'
import { QuestionUpperInclude } from './question-upper.service'

export { AnswerDowner } from '@prisma/client'

export type AnswerDownerWhereUniqueInput = Prisma.AnswerDownerWhereUniqueInput
export type AnswerDownerWhereInput = Prisma.AnswerDownerWhereInput
export type AnswerDownerOrderByWithRelationAndSearchRelevanceInput =
  Prisma.AnswerDownerOrderByWithRelationAndSearchRelevanceInput
export type AnswerDownerInclude = Prisma.AnswerDownerInclude

@Injectable()
export class AnswerDownerService {
  private readonly logger = new Logger(AnswerDownerService.name)
  constructor(private prisma: PrismaService) {}

  async upsert(userId: number, answerId: number): Promise<AnswerDowner> {
    return this.prisma.answerDowner.upsert({
      where: { answerId_userId: { answerId, userId } },
      create: { answerId, userId },
      update: {},
    })
  }

  findMany(params: {
    skip?: number
    take?: number
    cursor?: AnswerDownerWhereUniqueInput
    where?: AnswerDownerWhereInput
    orderBy?: AnswerDownerOrderByWithRelationAndSearchRelevanceInput
    include?: AnswerDownerInclude
  }) {
    return this.prisma.answerDowner.findMany(params)
  }

  findOne(
    answerId: number,
    userId: number,
    include?: AnswerDownerInclude,
  ): Promise<AnswerDowner | null> {
    return this.prisma.answerDowner.findUnique({
      where: { answerId_userId: { answerId, userId } },
      include,
    })
  }

  findOne1(params: {
    where: AnswerDownerWhereUniqueInput
    include?: AnswerDownerInclude
  }): Promise<AnswerDowner | null> {
    return this.prisma.answerDowner.findUnique(params)
  }

  removeMany(where: AnswerDownerWhereInput): Promise<{ count: number }> {
    return this.prisma.answerDowner.deleteMany({ where })
  }
}
