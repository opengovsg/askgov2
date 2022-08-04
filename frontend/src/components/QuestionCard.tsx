import React, { FC } from 'react'
import { Button, Card, Typography } from 'antd'
import { Question } from '../data/question'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { dateFormat } from '../constants'

const { Text, Title } = Typography

interface QuestionCardProps {
  question: Question
  showAnswerBtn: boolean
}

export const QuestionCard: FC<QuestionCardProps> = (
  props: QuestionCardProps,
) => {
  return (
    <Card>
      {/*<p>*/}
      {/*  <Text type="secondary">*/}
      {/*    <Link to={`/profile/${props.question.submitter.id}`}>*/}
      {/*      {props.question.submitter.name}*/}
      {/*    </Link>*/}
      {/*  </Text>*/}
      {/*</p>*/}
      <Title level={5}>{props.question.body}</Title>
      <p>
        <Text type="secondary">
          {format(new Date(props.question.createdAt), dateFormat)}
        </Text>
      </p>
      {/*{props.showAnswerBtn && <Button>Answer</Button>}*/}
    </Card>
  )
}
