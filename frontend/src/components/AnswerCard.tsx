import React, { FC } from 'react'
import { AutoComplete, Button, Card, Space, Typography } from 'antd'
import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons'
import { Answer } from '../data/answer'
import { Link } from 'react-router-dom'
import { atom, useAtom } from 'jotai'

const { Text, Title } = Typography

interface AnswerCardProps {
  answer: Answer
  showQuestion: boolean
  onUp: () => void
  onDown: () => void
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
      {props.showQuestion && (
        <Title level={5}>{props.answer.question.body}</Title>
      )}
      <Text>{props.answer.body}</Text>
      <br />
      <Button icon={<UpCircleOutlined />} onClick={props.onUp}>
        {`${props.answer.ups}`}
      </Button>
      <Button icon={<DownCircleOutlined />} onClick={props.onDown}>
        {`${props.answer.downs}`}
      </Button>
    </Card>
  )
}
