import { ComponentMeta, ComponentStory } from '@storybook/react'

import Privacy from './Privacy.component'

export default {
  title: 'Components/PrivacyTerms/Privacy',
  component: Privacy,
} as ComponentMeta<typeof Privacy>

const Template: ComponentStory<typeof Privacy> = () => <Privacy />

export const Default = Template.bind({})
