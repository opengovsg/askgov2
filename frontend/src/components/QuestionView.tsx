import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Typography,
} from 'antd'
import { QuestionCard } from './QuestionCard'
import { AnswerList } from './AnswerList'
import {
  LikeType,
  questionQueryUpdateAnswerLikesFn,
  questionQueryUpdateQuestionLikesFn,
  useAnswerMutation,
  useLikeMutation,
  usePatchScreenStateMutation,
  useQuestionQuery,
} from '../api'
import { Answer, canAnswer, canScreen, Like, ScreenState, User } from '../data'
import { useCheckLogin } from './Frame'
import { checkNonAuthorLike } from './dialogs'

interface QuestionViewProps {
  currentUser?: User
}

export const QuestionView: FC<QuestionViewProps> = (
  props: QuestionViewProps,
) => {
  const { checkLogin, currentUser, currentOfficer } = useCheckLogin()

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
    if (checkLogin() && checkNonAuthorLike(currentUser, question)) {
      questionLikeMutation.mutate({
        id: parseInt(questionId ?? 'NaN', 10),
        like: Like.UP,
      })
    }
  }
  const onQuestionDown = () => {
    if (checkLogin() && checkNonAuthorLike(currentUser, question)) {
      questionLikeMutation.mutate({
        id: parseInt(questionId ?? 'NaN', 10),
        like: Like.DOWN,
      })
    }
  }
  const answerLikeMutation = useLikeMutation(
    LikeType.ANSWER,
    questionQueryUpdateAnswerLikesFn(questionQueryKey),
  )
  const onAnswerUp = (answer: Answer) => {
    if (checkLogin()) {
      answerLikeMutation.mutate({ id: answer.id, like: Like.UP })
    }
  }
  const onAnswerDown = (answer: Answer) => {
    if (checkLogin()) {
      answerLikeMutation.mutate({ id: answer.id, like: Like.DOWN })
    }
  }

  const [form] = Form.useForm()
  const answerMutation = useAnswerMutation(questionQueryKey, () => {
    form.resetFields()
  })
  const onFormFinish = (values: { body: string }) => {
    if (question) {
      answerMutation.mutate({ questionId: question.id, ...values })
    }
  }

  const patchScreenStateMutation = usePatchScreenStateMutation(
    questionQueryKey,
    () => {
      Modal.success({ content: 'Updated Screen State' })
    },
  )
  const onSelectChange = (value: ScreenState) => {
    question &&
      patchScreenStateMutation.mutate({
        questionId: question.id,
        screenState: value,
      })
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
        showAnswerBtn={false}
      />
      {canScreen(currentOfficer) && (
        <Card
          // margin: vertical | horizontal
          style={{ margin: '30px 0' }}
        >
          <Space>
            <Typography.Text>Screen State</Typography.Text>
            <Select
              value={question?.screenState}
              style={{ width: 100 }}
              onChange={onSelectChange}
            >
              <Select.Option value={ScreenState.NEW}>New</Select.Option>
              <Select.Option value={ScreenState.APPROVED}>
                Approved
              </Select.Option>
              <Select.Option value={ScreenState.REJECTED}>
                Rejected
              </Select.Option>
            </Select>
          </Space>
        </Card>
      )}
      {canAnswer(currentOfficer) && (
        <Card
          // margin: vertical | horizontal
          style={{ margin: '30px 0' }}
        >
          <Form
            layout="vertical"
            form={form}
            name="submit-answer"
            onFinish={onFormFinish}
          >
            <Form.Item
              name="body"
              label="Answer this Question"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
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
