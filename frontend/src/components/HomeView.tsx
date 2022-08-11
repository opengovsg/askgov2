import React, { FC, useState } from 'react'
import { Button, Card, Input, Modal, notification, Typography } from 'antd'
import { QuestionList } from './QuestionList'
import {
  LikeType,
  postQuestions,
  questionListQueryUpdateQuestionLikesFn,
  useLikeMutation,
  useQuestionsQuery,
} from '../api'
import { useMutation } from '@tanstack/react-query'
import { Like, ScreenState } from '../data'
import { useCheckLogin } from './Frame'

interface HomeViewProps {}

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
  const { checkLogin, currentUser } = useCheckLogin()

  // Setup Ask Dialog
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [askText, setAskText] = useState('')
  const askMutation = useAskMutation()
  const showModal = () => {
    if (checkLogin()) {
      setIsModalVisible(true)
    }
  }
  const handleOk = () => {
    askMutation.mutate(askText)
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

  // Setup Questions and like callbacks.
  const QUESTIONS_QUERY_KEY = ['questions']
  const questionsQuery = useQuestionsQuery(
    QUESTIONS_QUERY_KEY,
    ScreenState.APPROVED,
  )
  const likeMutation = useLikeMutation(
    LikeType.QUESTION,
    questionListQueryUpdateQuestionLikesFn(QUESTIONS_QUERY_KEY),
  )
  const onUp = (questionId: number) => {
    if (checkLogin()) {
      likeMutation.mutate({ id: questionId, like: Like.UP })
    }
  }
  const onDown = (questionId: number) => {
    if (checkLogin()) {
      likeMutation.mutate({ id: questionId, like: Like.DOWN })
    }
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
        <br />
        <Typography.Text type="secondary">
          Note: Submitting a question does not guarantee that the question will
          be published or answered.
        </Typography.Text>
      </Modal>
      <QuestionList
        questions={questionsQuery.data}
        onUp={onUp}
        onDown={onDown}
        showAnswerBtn={false}
        // onUpBuilder={props.appState.getOnUpBuilder}
        // onDownBuilder={props.appState.getOnDownBuilder}
        verticalMargin="30px"
      />
    </>
  )
}
