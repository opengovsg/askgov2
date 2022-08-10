import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../util'
import {
  Prisma,
  AnswerDowner,
  QuestionUpper,
  PrismaPromise,
  QuestionDowner,
} from '@prisma/client'
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

  upsert(userId: number, answerId: number): PrismaPromise<AnswerDowner> {
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
  }): PrismaPromise<AnswerDowner | null> {
    return this.prisma.answerDowner.findUnique(params)
  }

  remove(answerId: number, userId: number): PrismaPromise<AnswerDowner> {
    return this.prisma.answerDowner.delete({
      where: { answerId_userId: { answerId, userId } },
    })
  }

  removeMany(where: AnswerDownerWhereInput): PrismaPromise<{ count: number }> {
    return this.prisma.answerDowner.deleteMany({ where })
  }
}
