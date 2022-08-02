import React, { FC } from 'react';
import {AutoComplete, Button, Card, Space, Typography} from 'antd';
import {AppState} from "../data/state";
import {Question} from "../data/question";
import {QuestionCard} from "./QuestionCard";


interface QuestionListProps {
  questions: readonly Question[],
  showAnswerBtn: boolean,
  verticalMargin: string,}

export const QuestionList: FC<QuestionListProps> = (props: QuestionListProps) => {
  const questionCards = props.questions.map((q) => (
    <QuestionCard question={q} key={q.id} showAnswerBtn={props.showAnswerBtn}/>
  ));

  return (
    <Space
      direction="vertical"
      size="small"
      // margin: vertical | horizontal
      style={{ display: 'flex', margin: `${props.verticalMargin} 0` }}>
      { questionCards }
    </Space>
  );
}

