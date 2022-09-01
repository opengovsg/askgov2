import { ComponentMeta, ComponentStory } from '@storybook/react'

import Terms from './Terms.component'

export default {
  title: 'Components/PrivacyTerms/Terms',
  component: Terms,
} as ComponentMeta<typeof Terms>

const Template: ComponentStory<typeof Terms> = () => <Terms />

export const Default = Template.bind({})
