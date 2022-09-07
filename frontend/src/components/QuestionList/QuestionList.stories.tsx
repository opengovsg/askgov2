import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'

import { mockQuestionListDataApproved } from '../../__mocks__/mockData'

import QuestionList from './QuestionList.component'

export default {
  title: 'Components/Questions/QuestionList',
  component: QuestionList,
} as ComponentMeta<typeof QuestionList>

const Template: ComponentStory<typeof QuestionList> = (args) => (
  <QuestionList {...args} />
)

export const Default = Template.bind({})
Default.args = {
  questions: mockQuestionListDataApproved,
}
