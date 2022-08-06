import { QuestionCreateInput } from '../question.service'

export class CreateQuestionDto implements Omit<QuestionCreateInput, 'author'> {
  body!: string
}
