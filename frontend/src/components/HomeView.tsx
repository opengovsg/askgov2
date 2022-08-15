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
import { Like, Question, ScreenState } from '../data'
import { useCheckLogin } from './Frame'
import { checkNonAuthorLike } from './dialogs'
import { SearchParam } from '../constants'
import { createSearchParams, useSearchParams } from 'react-router-dom'

interface HomeViewProps {}

function useTags() {
  const [searchParams, setSearchParams] = useSearchParams()
  return searchParams.getAll(SearchParam.tag)
}

function useAskMutation(tags: string[]) {
  return useMutation(
    (newQuestion: string) => postQuestions(newQuestion, tags),
    {
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
    },
  )
}

export const HomeView: FC<HomeViewProps> = (props: HomeViewProps) => {
  const { checkLogin, currentUser } = useCheckLogin()

  // Setup Ask Dialog
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [askText, setAskText] = useState('')
  const tags = useTags()
  const askMutation = useAskMutation(tags)
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
    tags,
    ScreenState.APPROVED,
  )
  const likeMutation = useLikeMutation(
    LikeType.QUESTION,
    questionListQueryUpdateQuestionLikesFn(QUESTIONS_QUERY_KEY),
  )
  const onUp = (question: Question) => {
    if (checkLogin() && checkNonAuthorLike(currentUser, question)) {
      likeMutation.mutate({ id: question.id, like: Like.UP })
    }
  }
  const onDown = (question: Question) => {
    if (checkLogin() && checkNonAuthorLike(currentUser, question)) {
      likeMutation.mutate({ id: question.id, like: Like.DOWN })
    }
  }

  return (
    <>
      {tags.length > 0 && (
        <Typography.Title level={2}>{tags[0]}</Typography.Title>
      )}
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
          Note: Questions will be checked for inappropriate content before
          publishing.
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
