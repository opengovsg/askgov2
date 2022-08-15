import { BadRequestException, Injectable, Logger } from '@nestjs/common'
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
  tagQueryToArray(tags?: string | string[]): string[] {
    if (tags === undefined) {
      return []
    } else if (typeof tags === 'string') {
      return [tags]
    } else {
      return tags
    }
  }

  tagQueryToTags(tagQuery?: string | string[]): Promise<Tag[]> {
    const tags = this.tagQueryToArray(tagQuery)
    return this.findMany({
      where: { OR: tags.map((slug: string) => ({ slug })) },
    })
  }

  async tagQueryToTagsOrThrow(tagQuery?: string | string[]): Promise<Tag[]> {
    const tags = this.tagQueryToArray(tagQuery)
    const foundTags = await this.tagQueryToTags(tags)
    if (foundTags.length !== foundTags.length) {
      throw new BadRequestException(
        `Request included ${tags.length} tags (${tags}), but only ${foundTags.length} were valid.`,
      )
    }
    return foundTags
  }
}
