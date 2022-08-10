import React, { FC } from 'react'
import { Button, Card, Tabs, Typography } from 'antd'
import { SafetyCertificateOutlined } from '@ant-design/icons'
import { AppState } from '../data/state'
import { useParams } from 'react-router-dom'
import { QuestionCard } from './QuestionCard'
import { AnswerList } from './AnswerList'
import { QuestionList } from './QuestionList'

const { Text, Title } = Typography
const { TabPane } = Tabs

interface ProfileViewProps {
  appState: AppState
}

export const ProfileView: FC<ProfileViewProps> = (props: ProfileViewProps) => {
  const { userId } = useParams()
  const user = userId ? props.appState.getUserById(userId) : null

  if (user === null) {
    return (
      <div
        // margin: vertical | horizontal
        style={{ margin: '30px 0' }}
      >
        <Title>User Not found</Title>
      </div>
    )
  }

  const questions = props.appState.getQuestionByUser(user)
  const answers = props.appState.getAnswersByUser(user)

  return (
    <>
      <Card
        // margin: vertical | horizontal
        style={{ margin: '30px 0' }}
      >
        <Title level={2}>
          {user.canAnswer && <SafetyCertificateOutlined />}
          {/*{' ' + user.publicName}*/}
        </Title>
        {user.position && <Title level={4}>{user.position}</Title>}
        <Text>{user.headline}</Text>
      </Card>
      <Tabs
        defaultActiveKey={answers.length > 0 ? 'answers' : 'questions'}
        size="small"
      >
        <TabPane tab={`${answers.length} Answers`} key="answers">
          <AnswerList
            answers={answers}
            showQuestion={true}
            verticalMargin="0"
            onUpBuilder={props.appState.getOnUpBuilder}
            onDownBuilder={props.appState.getOnDownBuilder}
          />
        </TabPane>
        <TabPane tab={`${questions.length} Quesions`} key="questions">
          <QuestionList
            questions={questions}
            showAnswerBtn={false}
            verticalMargin="0"
          />
        </TabPane>
      </Tabs>
    </>
  )
}
