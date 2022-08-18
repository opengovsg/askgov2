import { AnswerCreateInput } from '../answer.service'

export class CreateAnswerDto
  implements Omit<AnswerCreateInput, 'author' | 'question'>
{
  body!: string
  questionId!: number
}
