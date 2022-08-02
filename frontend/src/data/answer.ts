import { Question } from './question'
import { User } from './user'

export interface Answer {
  id: number
  question: Question
  body: string
  submitter?: User
  ups?: number
  downs?: number
  createdAt: Date
  updatedAt?: Date
}
