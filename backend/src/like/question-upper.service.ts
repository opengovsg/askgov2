import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../util'
import { Prisma, QuestionUpper } from '@prisma/client'

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

  async upsert(userId: number, questionId: number): Promise<QuestionUpper> {
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
  ): Promise<QuestionUpper | null> {
    return this.prisma.questionUpper.findUnique({
      where: { questionId_userId: { questionId, userId } },
      include,
    })
  }

  removeMany(where: QuestionUpperWhereInput): Promise<{ count: number }> {
    return this.prisma.questionUpper.deleteMany({ where })
  }
}
