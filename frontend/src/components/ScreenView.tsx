import React, { FC } from 'react'
import { Button, Table, Tabs } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { AppState } from '../data/state'
import { Question, ScreenState } from '../data/question'

const { TabPane } = Tabs

interface TableRow {
  key: number
  question: Question
}

interface QuestionScreenTableProps {
  appState: AppState
  questionState: ScreenState
  onApprove?: (question: Question) => void
  onReject?: (question: Question) => void
}

const QuestionScreenTable: FC<QuestionScreenTableProps> = (
  props: QuestionScreenTableProps,
) => {
  const data: TableRow[] = props.appState.questions
    .filter((q) => q.screenState === props.questionState)
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
      render: (_, { question }) => question.body,
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'question',
      render: (_, { question }) => (
        <>
          {props.questionState !== ScreenState.APPROVED && (
            <Button type="link">Approve</Button>
          )}
          {props.questionState !== ScreenState.REJECTED && (
            <Button type="link">Reject</Button>
          )}
        </>
      ),
    },
  ]

  return <Table<TableRow> columns={columns} dataSource={data} />
}

interface ScreenViewProps {
  appState: AppState
}

export const ScreenView: FC<ScreenViewProps> = (props: ScreenViewProps) => {
  const currentUser = props.appState.getCurrentUser()
  return (
    <Tabs
      // margin: vertical | horizontal
      style={{ margin: '30px 0' }}
    >
      {Object.values(ScreenState).map((state) => (
        <TabPane tab={state} key={state}>
          <QuestionScreenTable
            appState={props.appState}
            questionState={state}
          />
        </TabPane>
      ))}
    </Tabs>
  )
}
