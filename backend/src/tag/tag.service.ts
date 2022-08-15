import { Injectable, Logger } from '@nestjs/common'
import { Prisma, Tag, QuestionTag } from '@prisma/client'
import { PrismaService } from '../util'
import {
  QuestionOrderByWithRelationAndSearchRelevanceInput,
  QuestionSelect,
  QuestionWhereInput,
  QuestionWhereUniqueInput,
} from '../question'

// re-export types used by service interface
export { Tag, QuestionTag } from '@prisma/client'

export type TagWhereUniqueInput = Prisma.TagWhereUniqueInput
export type TagUpsertArgs = Prisma.TagUpsertArgs
export type TagWhereInput = Prisma.TagWhereInput
export type TagOrderByWithRelationAndSearchRelevanceInput =
  Prisma.TagOrderByWithRelationAndSearchRelevanceInput
export type TagUpdateInput = Prisma.TagUpdateInput
export type TagSelect = Prisma.TagSelect
export type TagInclude = Prisma.TagInclude

export type QuestionTagWhereUniqueInput = Prisma.QuestionTagWhereUniqueInput
export type QuestionTagUpsertArgs = Prisma.QuestionTagUpsertArgs
export type QuestionTagWhereInput = Prisma.QuestionTagWhereInput
export type QuestionTagOrderByWithRelationAndSearchRelevanceInput =
  Prisma.QuestionTagOrderByWithRelationAndSearchRelevanceInput
export type QuestionTagUpdateInput = Prisma.QuestionTagUpdateInput
export type QuestionTagInclude = Prisma.QuestionTagInclude

@Injectable()
export class TagService {
  private readonly logger = new Logger(TagService.name)
  constructor(private prisma: PrismaService) {}

  findMany(params: {
    skip?: number
    take?: number
    cursor?: TagWhereUniqueInput
    where?: TagWhereInput
    orderBy?: TagOrderByWithRelationAndSearchRelevanceInput
    select?: TagSelect
  }) {
    return this.prisma.tag.findMany(params)
  }
}
