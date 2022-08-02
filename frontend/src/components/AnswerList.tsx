import React, { FC } from 'react';
import {AutoComplete, Button, Card, Space, Typography} from 'antd';
import {AppState} from "../data/state";
import {Answer} from "../data/answer";
import {AnswerCard} from "./AnswerCard";


interface AnswerListProps {
  answers: readonly Answer[],
  showQuestion: boolean,
  verticalMargin: string,
  onUpBuilder: (answer: Answer) => () => void,
  onDownBuilder: (answer: Answer) => () => void,
}

export const AnswerList: FC<AnswerListProps> = (props: AnswerListProps) => {
  const answerCards = props.answers.map((ans) => (
    <AnswerCard
      answer={ans}
      key={ans.id}
      showQuestion={props.showQuestion}
      onUp={props.onUpBuilder(ans)}
      onDown={props.onDownBuilder(ans)}
    />
  ));

  return (
    <Space
      direction="vertical"
      size="small"
      // margin: vertical | horizontal
      style={{ display: 'flex', margin: `${props.verticalMargin} 0` }}
    >
      { answerCards }
    </Space>
  );
}

