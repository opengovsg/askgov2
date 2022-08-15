import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { Prisma, Question, ScreenState, Tag } from '@prisma/client'
import { PrismaService } from '../util'
import { CreateQuestionDto } from './dto/create-question.dto'
import { TagService, TagWhereInput } from '../tag'
import { type } from 'os'

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

// This method works for Typescript string enums, and it appears that this is what Prisma enums are.
export function matchScreenState(value: string): ScreenState | undefined {
  return Object.values(ScreenState).find((v) => v === value)
}

@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name)
  constructor(private prisma: PrismaService, private tagService: TagService) {}

  create(data: QuestionCreateInput): Promise<Question> {
    return this.prisma.question.create({
      data,
    })
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

  async tagQueryToTags(tagQuery?: string | string[]): Promise<Tag[]> {
    const tags = this.tagQueryToArray(tagQuery)
    const foundTags = await this.tagService.findMany({
      where: { OR: tags.map((slug: string) => ({ slug })) },
    })
    if (tags.length !== foundTags.length) {
      throw new BadRequestException(
        `Request included ${tags.length} tags (${tags}), but only ${foundTags.length} were valid.`,
      )
    }
    return foundTags
  }

  async createFromDto(
    data: CreateQuestionDto,
    authorId: number,
    tagQuery?: string | string[],
  ): Promise<Question> {
    const foundTags = await this.tagQueryToTags(tagQuery)
    return this.prisma.question.create({
      data: {
        body: data.body,
        author: { connect: { id: authorId } },
        tags: {
          create: foundTags.map((tag: Tag) => ({
            tag: { connect: { id: tag.id } },
          })),
        },
      },
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
