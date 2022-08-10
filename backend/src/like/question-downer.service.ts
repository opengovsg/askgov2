import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../util'
import { Prisma, QuestionDowner } from '@prisma/client'

export { QuestionDowner } from '@prisma/client'

export type QuestionDownerWhereUniqueInput =
  Prisma.QuestionDownerWhereUniqueInput
export type QuestionDownerWhereInput = Prisma.QuestionDownerWhereInput
export type QuestionDownerOrderByWithRelationAndSearchRelevanceInput =
  Prisma.QuestionDownerOrderByWithRelationAndSearchRelevanceInput
export type QuestionDownerInclude = Prisma.QuestionDownerInclude

@Injectable()
export class QuestionDownerService {
  private readonly logger = new Logger(QuestionDownerService.name)
  constructor(private prisma: PrismaService) {}

  async upsert(userId: number, questionId: number): Promise<QuestionDowner> {
    return this.prisma.questionDowner.upsert({
      where: { questionId_userId: { questionId, userId } },
      create: { questionId, userId },
      update: {},
    })
  }

  findMany(params: {
    skip?: number
    take?: number
    cursor?: QuestionDownerWhereUniqueInput
    where?: QuestionDownerWhereInput
    orderBy?: QuestionDownerOrderByWithRelationAndSearchRelevanceInput
    include?: QuestionDownerInclude
  }) {
    return this.prisma.questionDowner.findMany(params)
  }

  findOne(
    questionId: number,
    userId: number,
    include?: QuestionDownerInclude,
  ): Promise<QuestionDowner | null> {
    return this.prisma.questionDowner.findUnique({
      where: { questionId_userId: { questionId, userId } },
      include,
    })
  }

  removeMany(where: QuestionDownerWhereInput): Promise<{ count: number }> {
    return this.prisma.questionDowner.deleteMany({ where })
  }
}
