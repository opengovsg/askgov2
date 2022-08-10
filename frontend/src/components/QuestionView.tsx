import React, { FC } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'

import { Button, Card, Typography } from 'antd'
import { QuestionCard } from './QuestionCard'
import { AnswerList } from './AnswerList'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { Question } from '../data/question'
import { User } from '../data/user'

function useQuestion(id?: string) {
  if (id === undefined) {
    id = 'none'
  }
  return useQuery(['questionDetail', id], () =>
    api.url(`/question/${id}`).get().json<Question>(),
  )
}

interface QuestionViewProps {
  currentUser?: User
}

export const QuestionView: FC<QuestionViewProps> = (
  props: QuestionViewProps,
) => {
  const { questionId } = useParams()

  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: question,
  } = useQuestion(questionId)
  if (isLoading) {
    return (
      <Typography.Title style={{ margin: '30px 0' }}>
        Loading...
      </Typography.Title>
    )
  } else if (isError) {
    return (
      <Card style={{ margin: '30px 0' }}>
        <Typography.Title>Loading Error</Typography.Title>
        <p>{error !== undefined && `${error}`}</p>
      </Card>
    )
  }

  return (
    <div
      // margin: vertical | horizontal
      style={{ margin: '30px 0' }}
    >
      <QuestionCard
        question={question}
        onUp={() => {}}
        onDown={() => {}}
        up={false}
        down={false}
        key={question.id}
        showAnswerBtn={props.currentUser?.canAnswer === true}
      />
      {question.answers && (
        <AnswerList
          showQuestion={false}
          answers={question.answers}
          verticalMargin="30px"
          onUpBuilder={(answer) => () => {}}
          onDownBuilder={(answer) => () => {}}
        />
      )}
    </div>
  )
}
