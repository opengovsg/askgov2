import React, { FC } from 'react'
import { Button, Card, Typography, Tag, Space, Badge, Col, Row } from 'antd'
import { Question } from '../data'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { DATE_FORMAT, routes } from '../constants'
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons'
import * as Path from 'path'
import { useAntPathGenerator } from '../util'
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
  const pathGen = useAntPathGenerator()
  const tags = props.question.tags?.map((qt: QuestionTag) => (
    <Tag color="blue" key={qt.tag.id}>
      {qt.tag.name}
    </Tag>
  ))
  const card = (
    <Card>
      <Link
        to={pathGen.get(routes.question, { id: props.question.id.toString() })}
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

        <Row>
          <Col span={22}>
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
          </Col>
          <Col span={2}>{props.showAnswerBtn && <Button>Answer</Button>}</Col>
        </Row>
      </Space>
    </Card>
  )
  return props.question._count.answers && props.question._count.answers > 0 ? (
    <Badge.Ribbon text="Answered" color="#038564">
      {card}
    </Badge.Ribbon>
  ) : (
    card
  )
}
