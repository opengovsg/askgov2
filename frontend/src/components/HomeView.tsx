import React, { FC, useState } from 'react'
import { Button, Card, Input, Modal, notification, Typography } from 'antd'
import { QuestionList } from './QuestionList'
import { api, getQuestions, postQuestions } from '../api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Like, Question, ScreenState, UserLikeData } from '../data'

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

const QUESTION_QUERY_ID = 'questions'

function useQuestionsQuery() {
  return useQuery([QUESTION_QUERY_ID], () => getQuestions(ScreenState.APPROVED))
}

function useLikeMutation() {
  const queryClient = useQueryClient()
  return useMutation(
    (params: { questionId: number; like: Like }) => {
      const { questionId, like } = params
      if (like === Like.UP) {
        return api
          .url(`/like/question/${questionId}/up`)
          .post()
          .json<UserLikeData>()
      } else {
        return api
          .url(`/like/question/${questionId}/down`)
          .post()
          .json<UserLikeData>()
      }
    },
    {
      onError: (error, variables, context) => {
        notification.error({
          message: 'Could not perform Like operation',
          description: `${error}`,
          // duration: 0,
        })
      },
      onSuccess: (data, variables, context) => {
        const questions = queryClient.getQueryData<Question[]>([
          QUESTION_QUERY_ID,
        ])
        if (questions) {
          queryClient.setQueryData(
            [QUESTION_QUERY_ID],
            (questions as Question[]).map((q: Question) => {
              if (q.id !== variables.questionId) {
                return q
              } else {
                return { ...q, ...data }
              }
            }),
          )
        }
      },
    },
  )
}

export const HomeView: FC<HomeViewProps> = (props: HomeViewProps) => {
  // Setup Ask Dialog
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [askText, setAskText] = useState('')
  const askMutation = useAskMutation()

  const showModal = () => {
    setIsModalVisible(true)
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
  const questionsQuery = useQuestionsQuery()
  const likeMutation = useLikeMutation()
  const onUp = (questionId: number) => {
    likeMutation.mutate({ questionId, like: Like.UP })
  }
  const onDown = (questionId: number) => {
    likeMutation.mutate({ questionId, like: Like.DOWN })
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
