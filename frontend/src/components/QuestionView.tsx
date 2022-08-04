import React, { FC } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'

import { Button, Card, Typography } from 'antd'
import { AppState } from '../data/state'
import { QuestionCard } from './QuestionCard'
import { AnswerList } from './AnswerList'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { Question } from '../data/question'

function useQuestion(id?: string) {
  if (id === undefined) {
    id = 'none'
  }
  return useQuery([`question-${id}`], () =>
    api.url(`/question/${id}`).get().json<Question>(),
  )
}

interface QuestionViewProps {
  appState: AppState
}

export const QuestionView: FC<QuestionViewProps> = (
  props: QuestionViewProps,
) => {
  const currentUser = props.appState.getCurrentUser()
  const { questionId } = useParams()
  // const question = questionId
  //   ? props.appState.getQuestionById(questionId)
  //   : null
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
        key={question.id}
        showAnswerBtn={currentUser !== null && currentUser.canAnswer}
      />
      {question.answers && (
        <AnswerList
          showQuestion={false}
          answers={question.answers}
          verticalMargin="30px"
          onUpBuilder={props.appState.getOnUpBuilder}
          onDownBuilder={props.appState.getOnDownBuilder}
        />
      )}
    </div>
  )
}
