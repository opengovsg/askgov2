import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'

import HomePage from './HomePage.component'
import { API_BASE_URL } from '../../constants'
import {
  mockQuestionCount,
  mockQuestionListDataApproved,
} from '../../__mocks__/mockData'

export default {
  title: 'Pages/HomePage',
  component: HomePage,
} as ComponentMeta<typeof HomePage>

const Template: ComponentStory<typeof HomePage> = () => <HomePage />

export const LoggedIn = Template.bind({})
export const LoggedOut = Template.bind({})
LoggedOut.parameters = {
  msw: {
    handlers: {
      questions: [
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
}
