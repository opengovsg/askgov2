import React, { FC, useState } from 'react'
import { Button, Card, Input, Modal, notification, Typography } from 'antd'
import { QuestionList } from './QuestionList'
import {
  LikeType,
  postQuestions,
  postAnswer,
  questionListQueryUpdateQuestionLikesFn,
  useLikeMutation,
  useQuestionsQuery,
  useTagsQuery,
  useAskMutation,
  useApprovedQuestionsQuery,
} from '../api'
import { useMutation } from '@tanstack/react-query'
import { canAnswer, Like, Permission, Question, ScreenState } from '../data'
import { useCheckLogin } from './Frame'
import { checkNonAuthorLike } from './dialogs'
import { SearchParam } from '../constants'
import { useSearchParams } from 'react-router-dom'
import { asErr } from '../util'
import { useTags } from './links'

interface HomeViewProps {}

function sortedQuestions(questions?: Question[]) {
  if (questions === undefined) {
    return questions
  }
}

export const HomeView: FC<HomeViewProps> = (props: HomeViewProps) => {
  const { checkLogin, currentUser, currentOfficer } = useCheckLogin()

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
    Modal.success({
      content:
        'Thank you for your question. Your question is currently under review. Please check back again later.',
    })
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
  const questionsQuery = useApprovedQuestionsQuery(QUESTIONS_QUERY_KEY, tags)
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

  const TAGS_QUERY_KEY = ['tags']
  const tagsQuery = useTagsQuery(TAGS_QUERY_KEY, tags)

  return (
    <>
      {tags.length > 0 && tagsQuery.data && (
        <Typography.Title level={2} style={{ margin: '30px 0' }}>
          {tagsQuery.data[0].name}
        </Typography.Title>
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
