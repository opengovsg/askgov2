import { User } from './user'
import { Answer } from './answer'

export enum QuestionState {
  NEW = 'NEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface Question {
  id: number
  body: string
  submitter?: User
  state?: QuestionState
  answers?: Answer[]
  createdAt: Date
  updatedAt?: Date
}
