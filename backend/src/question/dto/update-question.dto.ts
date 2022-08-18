import { PartialType } from '@nestjs/mapped-types'
import { CreateQuestionDto } from './create-question.dto'
import { ScreenState } from '../question.service'

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  screenState?: ScreenState
}
