import React, { FC } from 'react'
import { AutoComplete, Button, Card, Space, Typography } from 'antd'
import { Answer } from '../data/answer'
import { AnswerCard } from './AnswerCard'

interface AnswerListProps {
  answers: readonly Answer[]
  onUp: (answerId: number) => void
  onDown: (answerId: number) => void
  showQuestion: boolean
  verticalMargin: string
}

export const AnswerList: FC<AnswerListProps> = (props: AnswerListProps) => {
  const answerCards = props.answers.map((ans) => (
    <AnswerCard
      answer={ans}
      key={ans.id}
      showQuestion={props.showQuestion}
      up={ans.uppedBy && ans.uppedBy.length > 0}
      down={ans.downedBy && ans.downedBy.length > 0}
      onUp={props.onUp.bind(null, ans.id)}
      onDown={props.onDown.bind(null, ans.id)}
    />
  ))

  return (
    <Space
      direction="vertical"
      size="small"
      // margin: vertical | horizontal
      style={{ display: 'flex', margin: `${props.verticalMargin} 0` }}
    >
      {answerCards}
    </Space>
  )
}
