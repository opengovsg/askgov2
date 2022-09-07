import { User } from './user'
import { Answer } from './answer'
import { LikeCounts } from './like'
import { QuestionTag } from './tag'

export enum ScreenState {
  NEW = 'NEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface Question {
  id: number
  body: string
  createdAt: string
  authorId: number
  author?: User
  screenState: ScreenState
  uppedBy: { createdAt: string }[] // Should contain one element if logged in user clicked Up.
  downedBy: { createdAt: string }[] // Should contain one element if logged in user clicked Down.
  _count: LikeCounts
  answers?: Answer[]
  tags?: QuestionTag[]
}

export interface QuestionCount {
  _all: number
}
