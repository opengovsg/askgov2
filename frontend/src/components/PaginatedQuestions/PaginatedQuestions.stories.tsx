import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'

import {
  mockQuestionListDataApproved,
  mockQuestionCount,
} from '../../__mocks__/mockData'

import PaginatedQuestions from './PaginatedQuestions.component'
import { API_BASE_URL } from '../../constants'
import { LoggedInOfficer } from '../Header/Header.stories'

export default {
  title: 'Components/Questions/PaginatedQuestions',
  component: PaginatedQuestions,
  parameters: {
    msw: {
      handlers: {
        posts: [
          rest.get(
            API_BASE_URL + '/api/v1/question/approved',
            (_req, res, ctx) => {
              return res(ctx.json(mockQuestionListDataApproved))
            },
          ),
          rest.get(
            API_BASE_URL + '/api/v1/question/approved/count',
            (_req, res, ctx) => {
              return res(ctx.json(mockQuestionCount))
            },
          ),
        ],
      },
    },
  },
} as ComponentMeta<typeof PaginatedQuestions>

const Template: ComponentStory<typeof PaginatedQuestions> = (args) => (
  <PaginatedQuestions {...args} />
)

export const Default = Template.bind({})
Default.args = {
  questionsPerPage: 4,
  showViewAllQuestionsButton: false,
}
