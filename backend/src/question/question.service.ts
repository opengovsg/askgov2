import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common'
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

  async createFromDto(
    data: CreateQuestionDto,
    authorId: number,
    tagQuery?: string | string[],
  ): Promise<Question> {
    const foundTags = await this.tagService.tagQueryToTagsOrThrow(tagQuery)
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

  async findByTagAndScreenState(
    userId?: number,
    tagQuery?: string | string[],
    screenState?: string,
  ) {
    let where: QuestionWhereInput | undefined = {}
    const tags = await this.tagService.tagQueryToTagsOrThrow(tagQuery)
    if (tags.length > 0) {
      where = {
        ...where,
        OR: tags.map((t: Tag) => ({ tags: { some: { tagId: t.id } } })),
      }
    }
    if (screenState !== undefined) {
      const match = matchScreenState(screenState)
      if (match) {
        where = {
          ...where,
          screenState: matchScreenState(screenState),
        }
      } else {
        throw new HttpException(
          'Invalid screenState query parameter',
          HttpStatus.BAD_REQUEST,
        )
      }
    }

    let questionSelect: QuestionSelect = {
      id: true,
      body: true,
      createdAt: true,
      authorId: true,
      tags: {
        select: {
          tag: true,
        },
      },
      _count: {
        select: {
          answers: true,
          uppedBy: true,
          downedBy: true,
        },
      },
    }

    // let answerSelect: AnswerSelect = {
    //   id: true,
    //   body: true,
    //   createdAt: true,
    //   _count: {
    //     select: {
    //       uppedBy: true,
    //       downedBy: true,
    //     },
    //   },
    // }

    if (userId) {
      // answerSelect.uppedBy = {
      //   where: { userId },
      //   select: {
      //     createdAt: true,
      //   },
      // }
      // answerSelect.downedBy = {
      //   where: { userId },
      //   select: {
      //     createdAt: true,
      //   },
      // }
      questionSelect.uppedBy = {
        where: { userId },
        select: {
          createdAt: true,
        },
      }
      questionSelect.downedBy = {
        where: { userId },
        select: {
          createdAt: true,
        },
      }
    }

    // questionSelect.answers = {
    //   select: answerSelect,
    // }

    const found = this.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: questionSelect,
    })

    return found
    // return found.map((question) => {
    //   const { id, body, screenState, createdAt, updatedAt, authorId, include } = question
    //   return {id: q.id, body, screenState, createdAt: }
    // })
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
