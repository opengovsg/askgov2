import React, { FC } from 'react'
import { AutoComplete, Button, Card, Space, Typography } from 'antd'
import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons'
import { Answer } from '../data/answer'
import { Link } from 'react-router-dom'
import { atom, useAtom } from 'jotai'
import { format } from 'date-fns'
import { DATE_FORMAT } from '../constants'

const { Text, Title } = Typography

interface AnswerCardProps {
  answer: Answer
  showQuestion: boolean
  onUp: () => void
  onDown: () => void
  up: boolean
  down: boolean
}

const priceAtom = atom(10)

export const AnswerCard: FC<AnswerCardProps> = (props: AnswerCardProps) => {
  const [price, updatePrice] = useAtom(priceAtom)
  return (
    <Card>
      {/*<p>*/}
      {/*  <Text type="secondary">*/}
      {/*    <Link to={`/profile/${props.answer.submitter.id}`}>*/}
      {/*      {props.answer.submitter.name}*/}
      {/*    </Link>*/}
      {/*  </Text>*/}
      {/*</p>*/}
      {props.showQuestion && props.answer.question && (
        <Title level={5}>{props.answer.question.body}</Title>
      )}
      <Title level={5}>Answer</Title>
      <Text>{props.answer.body}</Text>
      <p>
        <Text type="secondary">
          {format(new Date(props.answer.createdAt), DATE_FORMAT)}
        </Text>
      </p>
      <Button
        icon={<UpCircleOutlined />}
        onClick={props.onUp}
        type={props.up ? 'primary' : 'default'}
      >
        {`${props.answer._count.uppedBy}`}
      </Button>
      {/*<Button*/}
      {/*  icon={<DownCircleOutlined />}*/}
      {/*  onClick={props.onDown}*/}
      {/*  type={props.down ? 'primary' : 'default'}*/}
      {/*>*/}
      {/*  {`${props.answer._count.downedBy}`}*/}
      {/*</Button>*/}
    </Card>
  )
}
