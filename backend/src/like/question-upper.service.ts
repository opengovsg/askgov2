import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../util'
import {
  Prisma,
  PrismaPromise,
  QuestionDowner,
  QuestionUpper,
} from '@prisma/client'

export { QuestionUpper } from '@prisma/client'

export type QuestionUpperWhereUniqueInput = Prisma.QuestionUpperWhereUniqueInput
export type QuestionUpperWhereInput = Prisma.QuestionUpperWhereInput
export type QuestionUpperOrderByWithRelationAndSearchRelevanceInput =
  Prisma.QuestionUpperOrderByWithRelationAndSearchRelevanceInput
export type QuestionUpperInclude = Prisma.QuestionUpperInclude

@Injectable()
export class QuestionUpperService {
  private readonly logger = new Logger(QuestionUpperService.name)
  constructor(private prisma: PrismaService) {}

  upsert(userId: number, questionId: number): PrismaPromise<QuestionUpper> {
    return this.prisma.questionUpper.upsert({
      where: { questionId_userId: { questionId, userId } },
      create: { questionId, userId },
      update: {},
    })
  }

  findMany(params: {
    skip?: number
    take?: number
    cursor?: QuestionUpperWhereUniqueInput
    where?: QuestionUpperWhereInput
    orderBy?: QuestionUpperOrderByWithRelationAndSearchRelevanceInput
    include?: QuestionUpperInclude
  }) {
    return this.prisma.questionUpper.findMany(params)
  }

  findOne(
    questionId: number,
    userId: number,
    include?: QuestionUpperInclude,
  ): PrismaPromise<QuestionUpper | null> {
    return this.prisma.questionUpper.findUnique({
      where: { questionId_userId: { questionId, userId } },
      include,
    })
  }

  remove(questionId: number, userId: number): PrismaPromise<QuestionUpper> {
    return this.prisma.questionUpper.delete({
      where: { questionId_userId: { questionId, userId } },
    })
  }

  removeMany(where: QuestionUpperWhereInput): PrismaPromise<{ count: number }> {
    return this.prisma.questionUpper.deleteMany({ where })
  }
}
