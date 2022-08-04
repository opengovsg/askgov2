import { Question } from './question'
import { User } from './user'

export interface Answer {
  id: number
  question?: Question
  questionId?: number
  body: string
  submitter?: User
  ups?: number
  downs?: number
  createdAt: string
  updatedAt?: string
}
