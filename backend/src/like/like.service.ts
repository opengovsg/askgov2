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
import { AnswerService } from '../answer'

enum Dir {
  UP,
  DOWN,
}

@Injectable()
export class LikeService {
  constructor(
    private prisma: PrismaService,
    private readonly questionService: QuestionService,
    private readonly questionUpperService: QuestionUpperService,
    private readonly questionDownerService: QuestionDownerService,
    private readonly answerService: AnswerService,
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

  async checkAnswerState(userId: number, answerId: number, direction: Dir) {
    const answer = await this.answerService.findOne(
      answerId,
      direction === Dir.UP
        ? { uppedBy: { where: { userId } } }
        : { downedBy: { where: { userId } } },
    )
    if (!answer) {
      throw new NotFoundException(`Answer ${answerId} not found`)
    }
    // if (answer.authorId == userId) {
    //   throw new BadRequestException(
    //     `Like operations are not allowed by authors`,
    //   )
    // }
    return direction === Dir.UP
      ? (answer as any).uppedBy.length > 0
      : (answer as any).downedBy.length > 0
  }

  async getAnswerLikeState(userId: number, answerId: number) {
    return this.answerService.findOneSelect(answerId, {
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

  async upAnswer(userId: number, answerId: number) {
    const up = await this.checkAnswerState(userId, answerId, Dir.UP)

    if (up) {
      const [countRemovedQDown, newQUp] = await this.prisma.$transaction([
        this.answerUpperService.removeMany({ userId, answerId }),
        this.answerDownerService.removeMany({ userId, answerId }),
      ])
    } else {
      const [countRemovedQDown, newQUp] = await this.prisma.$transaction([
        this.answerUpperService.upsert(userId, answerId),
        this.answerDownerService.removeMany({ userId, answerId }),
      ])
    }
    return this.getAnswerLikeState(userId, answerId)
  }

  async downAnswer(userId: number, answerId: number) {
    const down = await this.checkAnswerState(userId, answerId, Dir.DOWN)

    if (down) {
      const [countRemovedQDown, newQUp] = await this.prisma.$transaction([
        this.answerUpperService.removeMany({ userId, answerId }),
        this.answerDownerService.removeMany({ userId, answerId }),
      ])
    } else {
      const [countRemovedQDown, newQUp] = await this.prisma.$transaction([
        this.answerUpperService.removeMany({ userId, answerId }),
        this.answerDownerService.upsert(userId, answerId),
      ])
    }
    return this.getAnswerLikeState(userId, answerId)
  }
}
