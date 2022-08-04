import React, { FC, useState } from 'react'
import {
  AutoComplete,
  Button,
  Card,
  Form,
  Input,
  Space,
  Modal,
  notification,
} from 'antd'
import { AppState } from '../data/state'
import { QuestionList } from './QuestionList'
import { QuestionSubmit } from './QuestionSubmit'
import { api, getQuestions, postQuestions } from '../api'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Question, ScreenState } from '../data/question'

interface HomeViewProps {
  appState: AppState
}

function useQuestions() {
  const { data } = useQuery(['questions'], () =>
    getQuestions(ScreenState.APPROVED),
  )
  return data
}

function useAskMutation() {
  return useMutation((newQuestion: string) => postQuestions(newQuestion), {
    onError: (error, variables, context) => {
      notification.error({
        message: 'Could not submit question',
        description: `${error}`,
      })
    },
    onSuccess: (data, variables, context) => {
      notification.success({
        message: 'Question Submitted',
      })
    },
  })
}

export const HomeView: FC<HomeViewProps> = (props: HomeViewProps) => {
  const currentUser = props.appState.getCurrentUser()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [askText, setAskText] = useState('')

  // React-query
  const questions = useQuestions()
  const mutation = useAskMutation()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    mutation.mutate(askText)
    setIsModalVisible(false)
    setAskText('')
  }

  const handleCancel = () => {
    // submit askText
    setIsModalVisible(false)
  }

  const handleAskTextChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setAskText(e.currentTarget.value)
  }

  return (
    <>
      <Card
        // margin: vertical | horizontal
        style={{ margin: '30px 0' }}
      >
        <Button type="primary" onClick={showModal}>
          Ask a Question
        </Button>
      </Card>
      <Modal
        title="Ask a Question"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input.TextArea
          rows={4}
          placeholder="What do you want to ask?"
          maxLength={300}
          showCount={true}
          value={askText}
          onChange={handleAskTextChange}
        />
      </Modal>{' '}
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
