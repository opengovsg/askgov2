import { ComponentMeta, ComponentStory } from '@storybook/react'

import CitizenRequest from './CitizenRequest.component'

export default {
  title: 'Components/CitizenRequest',
  component: CitizenRequest,
} as ComponentMeta<typeof CitizenRequest>

const Template: ComponentStory<typeof CitizenRequest> = (args) => (
  <CitizenRequest />
)

export const Default = Template.bind({})
