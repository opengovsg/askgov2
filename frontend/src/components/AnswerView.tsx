import React, { FC } from 'react';
import { Button } from 'antd';
import {AppState} from "../data/state";
import {QuestionList} from "./QuestionList";


interface AnswerViewProps {
  appState: AppState,
}

export const AnswerView: FC<AnswerViewProps> = (props: AnswerViewProps) => {
  const currentUser = props.appState.getCurrentUser();
  return (
    <QuestionList
      questions={props.appState.questions}
      showAnswerBtn={true}
      verticalMargin="30px"
    />
  );
}

