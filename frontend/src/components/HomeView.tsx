import React, { FC } from 'react'
import { AutoComplete, Button, Card, Input, Space } from 'antd'
import { AppState } from '../data/state'
import { QuestionList } from './QuestionList'
import { QuestionSubmit } from './QuestionSubmit'
import { api } from '../api'
import { useQuery } from '@tanstack/react-query'
import { Question } from '../data/question'

interface HomeViewProps {
  appState: AppState
}

function useQuestions() {
  const { data } = useQuery(
    ['questions'],
    () => api.url(`/question`).get().json<Question[]>(),
    {
      suspense: true,
    },
  )
  return data
}

export const HomeView: FC<HomeViewProps> = (props: HomeViewProps) => {
  const currentUser = props.appState.getCurrentUser()
  const questions = useQuestions()
  return (
    <>
      {currentUser && (
        <QuestionSubmit
          user={currentUser}
          onSubmit={props.appState.addQuestion}
        />
      )}
      <QuestionList
        questions={questions ? questions : []}
        showAnswerBtn={false}
        // onUpBuilder={props.appState.getOnUpBuilder}
        // onDownBuilder={props.appState.getOnDownBuilder}
        verticalMargin="30px"
      />
    </>
  )
}
