import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../util'
import { QuestionUpperService } from './question-upper.service'
import { QuestionDownerService } from './question-downer.service'
import { AnswerUpperService } from './answer-upper.service'
import { AnswerDownerService } from './answer-downer.service'
import { QuestionService } from '../question'

enum Dir {
  UP,
  DOWN,
}

@Injectable()
export class LikeService {
  constructor(
    private prisma: PrismaService,
    private readonly questionUpperService: QuestionUpperService,
    private readonly questionDownerService: QuestionDownerService,
    private readonly questionService: QuestionService,
    private readonly answerUpperService: AnswerUpperService,
    private readonly answerDownerService: AnswerDownerService,
  ) {}

  async checkQuestionState(userId: number, questionId: number, direction: Dir) {
    const question = await this.questionService.findOne(
      questionId,
      direction === Dir.UP
        ? { uppedBy: { where: { userId } } }
        : { downedBy: { where: { userId } } },
    )
    if (!question) {
      throw new NotFoundException(`Question ${questionId} not found`)
    }
    if (question.authorId == userId) {
      throw new BadRequestException(
        `Like operations are not allowed by authors`,
      )
    }
    return direction === Dir.UP
      ? (question as any).uppedBy.length > 0
      : (question as any).downedBy.length > 0
  }

  async getQuestionLikeState(userId: number, questionId: number) {
    return this.questionService.findOneSelect(questionId, {
      _count: { select: { uppedBy: true, downedBy: true } },
      uppedBy: {
        where: { userId },
        select: {
          createdAt: true,
        },
      },
      downedBy: {
        where: { userId },
        select: {
          createdAt: true,
        },
      },
    })
  }

  async upQuestion(userId: number, questionId: number) {
    const up = await this.checkQuestionState(userId, questionId, Dir.UP)

    if (up) {
      const [countRemovedQDown, newQUp] = await this.prisma.$transaction([
        this.questionUpperService.removeMany({ userId, questionId }),
        this.questionDownerService.removeMany({ userId, questionId }),
      ])
    } else {
      const [countRemovedQDown, newQUp] = await this.prisma.$transaction([
        this.questionUpperService.upsert(userId, questionId),
        this.questionDownerService.removeMany({ userId, questionId }),
      ])
    }
    return this.getQuestionLikeState(userId, questionId)
  }

  async downQuestion(userId: number, questionId: number) {
    const down = await this.checkQuestionState(userId, questionId, Dir.DOWN)

    if (down) {
      const [countRemovedQDown, newQUp] = await this.prisma.$transaction([
        this.questionUpperService.removeMany({ userId, questionId }),
        this.questionDownerService.removeMany({ userId, questionId }),
      ])
    } else {
      const [countRemovedQDown, newQUp] = await this.prisma.$transaction([
        this.questionUpperService.removeMany({ userId, questionId }),
        this.questionDownerService.upsert(userId, questionId),
      ])
    }
    return this.getQuestionLikeState(userId, questionId)
  }
}
