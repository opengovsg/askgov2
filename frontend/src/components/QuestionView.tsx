import React, { FC } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'

import { Button, Typography } from 'antd'
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
  const { data } = useQuery(
    [`question-${id}`],
    () => api.url(`/question/${id}`).get().json<Question>(),
    {
      suspense: true,
    },
  )
  return data
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
  const question = useQuestion(questionId)

  return (
    <div
      // margin: vertical | horizontal
      style={{ margin: '30px 0' }}
    >
      {question === undefined ? (
        <Typography.Title>Question Not found</Typography.Title>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}
