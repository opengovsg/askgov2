import { QuestionCreateInput } from '../question.service'

export class CreateQuestionDto implements QuestionCreateInput {
  body!: string
}
