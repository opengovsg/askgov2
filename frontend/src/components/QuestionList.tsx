import React, { FC } from 'react'
import { AutoComplete, Button, Card, Space, Typography } from 'antd'
import { AppState } from '../data/state'
import { Question } from '../data/question'
import { QuestionCard } from './QuestionCard'
import { Link } from 'react-router-dom'
import { routes } from '../constants/routes'

interface QuestionListProps {
  questions: readonly Question[]
  showAnswerBtn: boolean
  verticalMargin: string
}

export const QuestionList: FC<QuestionListProps> = (
  props: QuestionListProps,
) => {
  const questionCards = props.questions.map((q) => (
    <Link to={`${routes.question}/${q.id}`} key={q.id}>
      <QuestionCard question={q} showAnswerBtn={props.showAnswerBtn} />
    </Link>
  ))

  return (
    <Space
      direction="vertical"
      size="small"
      // margin: vertical | horizontal
      style={{ display: 'flex', margin: `${props.verticalMargin} 0` }}
    >
      {questionCards}
    </Space>
  )
}
