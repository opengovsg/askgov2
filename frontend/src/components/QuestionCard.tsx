import React, { FC } from 'react'
import { Button, Card, Typography } from 'antd'
import { Question } from '../data/question'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { DATE_FORMAT, routes } from '../constants'
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons'
import * as Path from 'path'
import { useGlobalSearchParams } from './links'

const { Text, Title } = Typography

interface QuestionCardProps {
  question: Question
  onUp: () => void
  onDown: () => void
  up: boolean
  down: boolean
  showAnswerBtn: boolean
}

export const QuestionCard: FC<QuestionCardProps> = (
  props: QuestionCardProps,
) => {
  const globalSearchParams = useGlobalSearchParams()
  return (
    <Card>
      {/*<p>*/}
      {/*  <Text type="secondary">*/}
      {/*    <Link to={`/profile/${props.question.submitter.id}`}>*/}
      {/*      {props.question.submitter.name}*/}
      {/*    </Link>*/}
      {/*  </Text>*/}
      {/*</p>*/}
      <Link
        to={`${routes.question}/${props.question.id}?${globalSearchParams}`}
      >
        <Title level={5}>{props.question.body}</Title>
        <p>
          <Text type="secondary">
            {format(new Date(props.question.createdAt), DATE_FORMAT)}
          </Text>
        </p>
      </Link>
      <Button
        icon={<UpCircleOutlined />}
        onClick={props.onUp}
        type={props.up ? 'primary' : 'default'}
      >
        {`${props.question._count.uppedBy}`}
      </Button>
      {/*<Button*/}
      {/*  icon={<DownCircleOutlined />}*/}
      {/*  onClick={props.onDown}*/}
      {/*  type={props.down ? 'primary' : 'default'}*/}
      {/*>*/}
      {/*  {`${props.question._count.downedBy}`}*/}
      {/*</Button>*/}
      {/*{props.showAnswerBtn && <Button>Answer</Button>}*/}
    </Card>
  )
}
