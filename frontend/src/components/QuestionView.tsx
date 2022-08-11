import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

import { Card, Typography } from 'antd'
import { QuestionCard } from './QuestionCard'
import { AnswerList } from './AnswerList'
import {
  LikeType,
  questionQueryUpdateQuestionLikesFn,
  questionQueryUpdateAnswerLikesFn,
  useLikeMutation,
  useQuestionQuery,
} from '../api'
import { Like, User } from '../data'

interface QuestionViewProps {
  currentUser?: User
}

export const QuestionView: FC<QuestionViewProps> = (
  props: QuestionViewProps,
) => {
  const { questionId } = useParams()

  const questionQueryKey = ['question', questionId ?? 'none']
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: question,
  } = useQuestionQuery(questionQueryKey, questionId)
  const questionLikeMutation = useLikeMutation(
    LikeType.QUESTION,
    questionQueryUpdateQuestionLikesFn(questionQueryKey),
  )

  const onQuestionUp = () => {
    questionLikeMutation.mutate({
      id: parseInt(questionId ?? 'NaN', 10),
      like: Like.UP,
    })
  }
  const onQuestionDown = () => {
    questionLikeMutation.mutate({
      id: parseInt(questionId ?? 'NaN', 10),
      like: Like.DOWN,
    })
  }
  const answerLikeMutation = useLikeMutation(
    LikeType.ANSWER,
    questionQueryUpdateAnswerLikesFn(questionQueryKey),
  )
  const onAnswerUp = (answerId: number) => {
    answerLikeMutation.mutate({ id: answerId, like: Like.UP })
  }
  const onAnswerDown = (answerId: number) => {
    answerLikeMutation.mutate({ id: answerId, like: Like.DOWN })
  }

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
        onUp={onQuestionUp}
        onDown={onQuestionDown}
        up={question.uppedBy && question.uppedBy.length > 0}
        down={question.downedBy && question.downedBy.length > 0}
        key={question.id}
        showAnswerBtn={props.currentUser?.canAnswer === true}
      />
      {question.answers && (
        <AnswerList
          showQuestion={false}
          answers={question.answers}
          verticalMargin="30px"
          onUp={onAnswerUp}
          onDown={onAnswerDown}
        />
      )}
    </div>
  )
}
