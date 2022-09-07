import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

import { QuestionsHeader } from '../QuestionsHeader/QuestionsHeader.component'
import PaginatedQuestions from '../PaginatedQuestions/PaginatedQuestions.component'

import { QuestionsDisplayState, questionsDisplayStates } from './questions'

interface QuestionsProps {
  agencyId?: number
  tags?: string // TODO: tags unused, to remove dead code?
  questionsPerPage?: number
  showViewAllQuestionsButton?: boolean
  listAnswerable?: boolean
}
export const Questions = ({
  agencyId,
  tags,
  questionsPerPage,
  showViewAllQuestionsButton,
  listAnswerable,
}: QuestionsProps): JSX.Element => {
  const location = useLocation()
  const questionsDisplayState: QuestionsDisplayState = {
    value: 'all',
    label: 'All',
    questionsPerPage: 30,
  }

  return (
    <Box flex="5">
      <QuestionsHeader />
      <PaginatedQuestions
        questionsPerPage={
          questionsPerPage || questionsDisplayState.questionsPerPage
        }
        showViewAllQuestionsButton={
          showViewAllQuestionsButton ?? questionsDisplayState.value === 'top'
        }
      />
    </Box>
  )
}
