import type { Question } from './question'
import type { Answer } from './answer'

export interface Officer {
  id: number
  email: string
  createdAt: string
  updatedAt: string
  authoredAnswers?: Question[]
  permissions?: OfficerPermissions[]
}

export function canAnswer(officer?: Officer): boolean {
  return (
    officer?.permissions?.find((p) => p.permission === Permission.ANSWER) !==
    undefined
  )
}

export function canScreen(officer?: Officer): boolean {
  return (
    officer?.permissions?.find((p) => p.permission === Permission.SCREEN) !==
    undefined
  )
}

export enum Permission {
  SCREEN = 'SCREEN',
  ANSWER = 'ANSWER',
}

export interface OfficerPermissions {
  id: number
  officer?: Officer
  officerId: number
  permission: Permission
  createdAt: string
  updatedAt: string
}
