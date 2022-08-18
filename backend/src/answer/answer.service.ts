import { Injectable, Logger } from '@nestjs/common'
import { Prisma, Answer, Question, Tag } from '@prisma/client'
import { PrismaService } from '../util'
import { CreateAnswerDto } from './dto/create-answer.dto'

export { Answer } from '@prisma/client'
export type AnswerWhereUniqueInput = Prisma.AnswerWhereUniqueInput
export type AnswerCreateInput = Prisma.AnswerCreateInput
export type AnswerWhereInput = Prisma.AnswerWhereInput
export type AnswerOrderByWithRelationAndSearchRelevanceInput =
  Prisma.AnswerOrderByWithRelationAndSearchRelevanceInput
export type AnswerUpdateInput = Prisma.AnswerUpdateInput
export type AnswerInclude = Prisma.AnswerInclude
export type AnswerSelect = Prisma.AnswerSelect

@Injectable()
export class AnswerService {
  private readonly logger = new Logger(AnswerService.name)
  constructor(private prisma: PrismaService) {}

  create(data: AnswerCreateInput): Promise<Answer> {
    return this.prisma.answer.create({
      data,
    })
  }

  async createFromDto(
    data: CreateAnswerDto,
    authorId: number,
    tagQuery?: string | string[],
  ): Promise<Answer> {
    return this.prisma.answer.create({
      data: {
        body: data.body,
        question: { connect: { id: data.questionId } },
        author: { connect: { id: authorId } },
      },
    })
  }

  findMany(params: {
    skip?: number
    take?: number
    cursor?: AnswerWhereUniqueInput
    where?: AnswerWhereInput
    orderBy?: AnswerOrderByWithRelationAndSearchRelevanceInput
    select?: AnswerSelect
  }) {
    return this.prisma.answer.findMany(params)
  }

  findOne(id: number, include?: AnswerInclude) {
    return this.prisma.answer.findUnique({ where: { id }, include })
  }

  findOneSelect(id: number, select: AnswerSelect) {
    return this.prisma.answer.findUnique({ where: { id }, select })
  }

  findOneWhere(params: {
    where: AnswerWhereUniqueInput
    include?: AnswerInclude
  }): Promise<Answer | null> {
    return this.prisma.answer.findUnique(params)
  }

  update(id: number, data: AnswerUpdateInput): Promise<Answer> {
    return this.prisma.answer.update({ where: { id }, data })
  }

  updateWhere(params: {
    where: AnswerWhereUniqueInput
    data: AnswerUpdateInput
  }): Promise<Answer> {
    return this.prisma.answer.update(params)
  }

  remove(id: number): Promise<Answer> {
    return this.prisma.answer.delete({ where: { id } })
  }

  removeWhere(where: AnswerWhereUniqueInput): Promise<Answer> {
    return this.prisma.answer.delete({ where })
  }
}
