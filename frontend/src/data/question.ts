import { User } from './user'
import { Answer } from './answer'

export enum ScreenState {
  NEW = 'NEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface Question {
  id: number
  body: string
  submitter?: User
  screenState: ScreenState
  answers?: Answer[]
  createdAt: string
  updatedAt?: string
}
