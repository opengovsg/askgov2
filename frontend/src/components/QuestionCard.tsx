import React, { FC } from 'react'
import { Button, Card, Typography, Tag, Space, Badge } from 'antd'
import { Question } from '../data/question'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { DATE_FORMAT, routes } from '../constants'
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons'
import * as Path from 'path'
import { useGlobalSearchParams } from './links'
import { QuestionTag } from '../data'

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
  const tags = props.question.tags?.map((qt: QuestionTag) => (
    <Tag color="blue" key={qt.tag.id}>
      {qt.tag.name}
    </Tag>
  ))
  const card = (
    <Card>
      <Link
        to={`${routes.question}/${props.question.id}?${globalSearchParams}`}
      >
        <Title level={5}>{props.question.body}</Title>
      </Link>

      <Space direction="vertical" size="small" style={{ display: 'flex' }}>
        <Space>
          <Text type="secondary">
            {format(new Date(props.question.createdAt), DATE_FORMAT)}
          </Text>
          {tags}
        </Space>

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
      </Space>
    </Card>
  )
  return props.question._count.answers && props.question._count.answers > 0 ? (
    <Badge.Ribbon text="Answered" color="red">
      {card}
    </Badge.Ribbon>
  ) : (
    card
  )
}
