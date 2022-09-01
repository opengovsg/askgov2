import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'

import Header from './Header.component'
import { API_BASE_URL } from '../../constants'
import { User, WhoamiResult } from '../../data'
import { mockOfficerData, mockUserData } from '../../__mocks__/mockData'

export default {
  title: 'Components/Headers/Header',
  component: Header,
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = () => <Header />

export const LoggedOut = Template.bind({})
const loggedOutWhoami: WhoamiResult = {
  currentUser: null,
  currentOfficer: null,
}
LoggedOut.parameters = {
  msw: {
    handlers: {
      auth: [
        rest.get(API_BASE_URL + '/api/v1/auth/whoami', (_req, res, ctx) => {
          return res(ctx.json(loggedOutWhoami))
        }),
      ],
    },
  },
}

export const LoggedInUser = Template.bind({})
const loggedInUserWhoami: WhoamiResult = {
  currentUser: mockUserData,
  currentOfficer: null,
}
LoggedInUser.parameters = {
  msw: {
    handlers: {
      auth: [
        rest.get(API_BASE_URL + '/api/v1/auth/whoami', (_req, res, ctx) => {
          return res(ctx.json(loggedInUserWhoami))
        }),
      ],
    },
  },
}

export const LoggedInOfficer = Template.bind({})
const loggedInOfficerWhoami: WhoamiResult = {
  currentUser: null,
  currentOfficer: mockOfficerData,
}
LoggedInOfficer.parameters = {
  msw: {
    handlers: {
      auth: [
        rest.get(API_BASE_URL + '/api/v1/auth/whoami', (_req, res, ctx) => {
          return res(ctx.json(loggedInOfficerWhoami))
        }),
      ],
    },
  },
}
