import { ComponentMeta, ComponentStory } from '@storybook/react'

import QuestionListItem from './QuestionListItem.component'

import {
  mockQuestionDataApproved,
  mockQuestionDataAnswered,
  mockQuestionDataAnsweredLiked,
  mockQuestionDataAnsweredLikedByUser,
} from '../../__mocks__/mockData'

export default {
  title: 'Components/Questions/QuestionListItem',
  component: QuestionListItem,
} as ComponentMeta<typeof QuestionListItem>

const Template: ComponentStory<typeof QuestionListItem> = (args) => (
  <QuestionListItem {...args} />
)

export const Approved = Template.bind({})
Approved.args = {
  question: mockQuestionDataApproved,
}

export const Answered = Template.bind({})
Answered.args = {
  question: mockQuestionDataAnswered,
}

export const AnsweredLiked = Template.bind({})
AnsweredLiked.args = {
  question: mockQuestionDataAnsweredLiked,
}

export const AnsweredLikedByUser = Template.bind({})
AnsweredLikedByUser.args = {
  question: mockQuestionDataAnsweredLikedByUser,
}
