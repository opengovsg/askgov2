import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../util'
import { Prisma, AnswerUpper, QuestionUpper } from '@prisma/client'
import { QuestionUpperInclude } from './question-upper.service'

export { AnswerUpper } from '@prisma/client'

export type AnswerUpperWhereUniqueInput = Prisma.AnswerUpperWhereUniqueInput
export type AnswerUpperWhereInput = Prisma.AnswerUpperWhereInput
export type AnswerUpperOrderByWithRelationAndSearchRelevanceInput =
  Prisma.AnswerUpperOrderByWithRelationAndSearchRelevanceInput
export type AnswerUpperInclude = Prisma.AnswerUpperInclude

@Injectable()
export class AnswerUpperService {
  private readonly logger = new Logger(AnswerUpperService.name)
  constructor(private prisma: PrismaService) {}

  async upsert(userId: number, answerId: number): Promise<AnswerUpper> {
    return this.prisma.answerUpper.upsert({
      where: { answerId_userId: { answerId, userId } },
      create: { answerId, userId },
      update: {},
    })
  }

  findMany(params: {
    skip?: number
    take?: number
    cursor?: AnswerUpperWhereUniqueInput
    where?: AnswerUpperWhereInput
    orderBy?: AnswerUpperOrderByWithRelationAndSearchRelevanceInput
    include?: AnswerUpperInclude
  }) {
    return this.prisma.answerUpper.findMany(params)
  }

  findOne(
    answerId: number,
    userId: number,
    include?: AnswerUpperInclude,
  ): Promise<AnswerUpper | null> {
    return this.prisma.answerUpper.findUnique({
      where: { answerId_userId: { answerId, userId } },
      include,
    })
  }

  findOne1(params: {
    where: AnswerUpperWhereUniqueInput
    include?: AnswerUpperInclude
  }): Promise<AnswerUpper | null> {
    return this.prisma.answerUpper.findUnique(params)
  }

  removeMany(where: AnswerUpperWhereInput): Promise<{ count: number }> {
    return this.prisma.answerUpper.deleteMany({ where })
  }
}
