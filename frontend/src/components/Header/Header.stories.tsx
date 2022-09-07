import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'

import Header from './Header.component'
import { API_BASE_URL } from '../../constants'
import {
  mockAuthUrl,
  mockedWhoamiLoggedOut,
  mockedWhoamiOfficer,
  mockedWhoamiUser,
} from '../../__mocks__/mockData'

export default {
  title: 'Components/Headers/Header',
  component: Header,
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const LoggedOut = Template.bind({})
LoggedOut.args = {
  showSearch: false,
  showId: false,
}
LoggedOut.parameters = {
  msw: {
    handlers: {
      auth: [
        rest.get(API_BASE_URL + '/api/v1/auth/whoami', (_req, res, ctx) => {
          return res(ctx.json(mockedWhoamiLoggedOut))
        }),
      ],
    },
  },
}

export const LoggedInUser = Template.bind({})
LoggedInUser.args = {
  showSearch: false,
  showId: false,
}

export const LoggedInOfficer = Template.bind({})
LoggedInOfficer.args = {
  showSearch: false,
  showId: false,
}
LoggedInOfficer.parameters = {
  msw: {
    handlers: {
      auth: [
        rest.get(API_BASE_URL + '/api/v1/auth/whoami', (_req, res, ctx) => {
          return res(ctx.json(mockedWhoamiOfficer))
        }),
      ],
    },
  },
}
