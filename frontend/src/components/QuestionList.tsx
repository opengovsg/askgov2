import React, { FC, ReactNode } from 'react'
import { AutoComplete, Button, Card, Space, Typography } from 'antd'
import { Question, ScreenState } from '../data/question'
import { QuestionCard } from './QuestionCard'
import { Link } from 'react-router-dom'
import { routes } from '../constants/routes'
import { useQuery } from '@tanstack/react-query'
import { getQuestions } from '../api'

interface QuestionListProps {
  questions?: Question[]
  onUp: (question: Question) => void
  onDown: (question: Question) => void
  showAnswerBtn: boolean
  verticalMargin: string
}

export const QuestionList: FC<QuestionListProps> = (
  props: QuestionListProps,
) => {
  const questionCards = props.questions ? (
    props.questions.map((q) => (
      <QuestionCard
        key={q.id}
        question={q}
        up={q.uppedBy && q.uppedBy.length > 0}
        down={q.downedBy && q.downedBy.length > 0}
        showAnswerBtn={props.showAnswerBtn}
        onUp={props.onUp.bind(null, q)}
        onDown={props.onDown.bind(null, q)}
      />
    ))
  ) : (
    <br />
  )

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
