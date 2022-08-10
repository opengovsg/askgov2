import type { Question } from './question'
import type { Answer } from './answer'

export interface User {
  id: number
  openid: string
  createdAt: string
  updatedAt: string
  authoredQuestions?: Question[]
  position?: string
  headline?: string
  canScreen?: boolean
  canAnswer?: boolean
}
