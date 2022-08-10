import React, { FC } from 'react'
import { Button } from 'antd'
import { Question } from '../data/question'
import { QuestionList } from './QuestionList'

interface AnswerViewProps {
  questions?: Question[]
}

export const AnswerView: FC<AnswerViewProps> = (props: AnswerViewProps) => {
  return (
    <QuestionList
      showAnswerBtn={true}
      verticalMargin="30px"
      onUp={() => {}}
      onDown={() => {}}
    />
  )
}
