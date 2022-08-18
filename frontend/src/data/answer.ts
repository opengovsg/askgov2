import { Question } from './question'
import { LikeCounts } from './like'

export interface Answer {
  id: number
  question?: Question
  questionId: number
  body: string
  createdAt: string
  uppedBy: { createdAt: string }[] // Should contain one element if logged in user clicked Up.
  downedBy: { createdAt: string }[] // Should contain one element if logged in user clicked Down.
  _count: LikeCounts
}
