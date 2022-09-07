import { Flex, Stack, Text } from '@chakra-ui/react'

import { useAuth } from '../../contexts/AuthContext'
// import { isUserPublicOfficer } from '../../services/user.service'
// import PostQuestionButton from '../PostQuestionButton/PostQuestionButton.component'
// import { SortQuestionsMenu } from '../SortQuestionsMenu/SortQuestionsMenu.component'

export const QuestionsHeader = (): JSX.Element => {
  const { currentUser: user, currentOfficer: officer } = useAuth()
  const isAuthenticatedOfficer = officer !== null

  return (
    <Flex
      flexDir={{ base: 'column-reverse', sm: 'row' }}
      justifyContent="space-between"
      mt={{ base: '32px', sm: '50px', xl: '58px' }}
      mb={{ sm: '18px' }}
    >
      <Text
        color="primary.500"
        textStyle="subhead-3"
        display="block"
        my={{ base: '16px', sm: '0px' }}
      >
        All Questions
      </Text>
      <Stack
        spacing={{ base: 2, sm: 4 }}
        direction={{ base: 'column', md: 'row' }}
      >
        {/*<SortQuestionsMenu*/}
        {/*  questionsDisplayState={questionsDisplayState}*/}
        {/*  questionsSortOrder={questionsSortOrder}*/}
        {/*  setQuestionsSortOrder={setQuestionsSortOrder}*/}
        {/*/>*/}
        {/*{isAuthenticatedOfficer && (*/}
        {/*  <PostQuestionButton mb={{ base: '16px', sm: '0px' }} />*/}
        {/*)}*/}
      </Stack>
    </Flex>
  )
}
