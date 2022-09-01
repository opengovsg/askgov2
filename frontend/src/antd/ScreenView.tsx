import React, { FC } from 'react'
import { Button, Modal, notification, Table, Tabs, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { canScreen, Question, ScreenState } from '../data'
import {
  usePatchScreenStateMutation,
  useQuestionsQuery,
  useTagsQuery,
} from '../api'
import { PathGenerator, useAntPathGenerator, useTags } from '../util'
import { UseQueryResult } from '@tanstack/react-query'
import { useCheckLogin } from './Frame'
import { routes } from '../constants'
import { Link } from 'react-router-dom'
import { asErr } from '../util'

const { TabPane } = Tabs

interface TableRow {
  key: number
  question: Question
}

interface QuestionScreenTableProps {
  questions: Question[]
  questionState: ScreenState
  onApprove: (question: Question) => void
  onReject: (question: Question) => void
  pathGenerator: PathGenerator
}

const QuestionScreenTable: FC<QuestionScreenTableProps> = (
  props: QuestionScreenTableProps,
) => {
  const data: TableRow[] = props.questions
    // .filter((q) => q.screenState === props.questionState)
    .map((q) => ({
      key: q.id,
      question: q,
    }))
  const columns: ColumnsType<TableRow> = [
    // {
    //   key: 'name',
    //   title: 'Submitter',
    //   dataIndex: 'question',
    //   render: (_, { question }) => question.submitter.name,
    // },
    {
      key: 'question',
      title: 'Question',
      dataIndex: 'question',
      render: (_, { question }) => (
        <Link
          to={props.pathGenerator.get(routes.question, {
            id: question.id.toString(),
          })}
        >
          {question.body}
        </Link>
      ),
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'question',
      render: (_, { question }) => (
        <>
          {props.questionState !== ScreenState.APPROVED && (
            <Button type="link" onClick={props.onApprove.bind(null, question)}>
              Approve
            </Button>
          )}
          {props.questionState !== ScreenState.REJECTED && (
            <Button type="link" onClick={props.onReject.bind(null, question)}>
              Reject
            </Button>
          )}
        </>
      ),
    },
  ]

  return <Table<TableRow> columns={columns} dataSource={data} />
}

interface ScreenViewProps {}

export const ScreenView: FC<ScreenViewProps> = (props: ScreenViewProps) => {
  const { checkLogin, currentUser, currentOfficer } = useCheckLogin()

  const queryMap = new Map<ScreenState, UseQueryResult<Question[], unknown>>()
  const tags = useTags()
  // Setup Questions and like callbacks.
  const QUESTIONS_NEW_QUERY_KEY = ['questions', 'new']
  queryMap.set(
    ScreenState.NEW,
    useQuestionsQuery(QUESTIONS_NEW_QUERY_KEY, tags, ScreenState.NEW),
  )
  const QUESTIONS_APPROVED_QUERY_KEY = ['questions', 'approved']
  queryMap.set(
    ScreenState.APPROVED,
    useQuestionsQuery(QUESTIONS_APPROVED_QUERY_KEY, tags, ScreenState.APPROVED),
  )
  const QUESTIONS_REJECTED_QUERY_KEY = ['questions', 'rejected']
  queryMap.set(
    ScreenState.REJECTED,
    useQuestionsQuery(QUESTIONS_REJECTED_QUERY_KEY, tags, ScreenState.REJECTED),
  )

  const TAGS_QUERY_KEY = ['tags']
  const tagsQuery = useTagsQuery(TAGS_QUERY_KEY, tags)

  const patchScreenStateMutation = usePatchScreenStateMutation(
    ['questions'],
    undefined,
    (error) => {
      const err = asErr(error)
      notification.error({
        message: 'Could not change screen state',
        description: `${err.message}`,
      })
    },
  )
  const onApprove = (question: Question) => {
    patchScreenStateMutation.mutate({
      questionId: question.id,
      screenState: ScreenState.APPROVED,
    })
  }
  const onReject = (question: Question) => {
    patchScreenStateMutation.mutate({
      questionId: question.id,
      screenState: ScreenState.REJECTED,
    })
  }

  const pathGen = useAntPathGenerator()

  return canScreen(currentOfficer) ? (
    <>
      {tags.length > 0 && tagsQuery.data && (
        <Typography.Title level={2} style={{ margin: '30px 0' }}>
          {tagsQuery.data[0].name}
        </Typography.Title>
      )}
      <Tabs
        // margin: vertical | horizontal
        style={{ margin: '30px 0' }}
      >
        {Object.values(ScreenState).map((screenState) => (
          <TabPane tab={screenState} key={screenState}>
            <QuestionScreenTable
              questions={queryMap.get(screenState)?.data ?? []}
              questionState={screenState}
              onApprove={onApprove}
              onReject={onReject}
              pathGenerator={pathGen}
            />
          </TabPane>
        ))}
      </Tabs>
    </>
  ) : (
    <Typography.Title level={3}>
      You are not authorized to view this page
    </Typography.Title>
  )
}
