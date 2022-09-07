import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Center, Flex } from '@chakra-ui/layout'
import { Button, Text } from '@chakra-ui/react'

import Pagination from '../Pagination'
import QuestionListComponent from '../QuestionList/QuestionList.component'
import {
  QuestionsDisplayState,
  questionsDisplayStates,
} from '../Questions/questions'
import Spinner from '../Spinner/Spinner.component'
import {
  useApprovedQuestionsPageQuery,
  useApprovedQuestionsCountQuery,
} from '../../api'

interface PaginatedQuestionsProps {
  tags?: string[]
  questionsPerPage: number
  showViewAllQuestionsButton: boolean
}

const PaginatedQuestions = ({
  tags,
  questionsPerPage,
  showViewAllQuestionsButton,
}: PaginatedQuestionsProps): JSX.Element => {
  // Pagination
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const QUESTION_QUERY_KEY = [
    'questionPage',
    { tags, page, size: questionsPerPage },
  ]
  const { data, isLoading } = useApprovedQuestionsPageQuery(
    QUESTION_QUERY_KEY,
    page,
    questionsPerPage,
    tags ?? [],
  )

  const QUESTION_COUNT_QUERY_KEY = ['questionCount', { tags }]
  const { data: countData, isLoading: countIsLoading } =
    useApprovedQuestionsCountQuery(QUESTION_COUNT_QUERY_KEY, tags ?? [])

  const handlePageChange = (nextPage: number) => {
    // -> request new data using the page number
    setPage(nextPage)
    window.scrollTo(0, 0)
  }

  return isLoading || countIsLoading ? (
    <Spinner centerHeight="200px" />
  ) : (
    <>
      <QuestionListComponent
        questions={data?.slice(0, questionsPerPage)}
        defaultText={undefined}
      />
      <Center my={5}>
        {showViewAllQuestionsButton ? (
          <Button
            mt={{ base: '40px', sm: '48px', xl: '58px' }}
            variant="outline"
            color="secondary.700"
            borderColor="secondary.700"
            onClick={() => {
              window.scrollTo(0, 0)
            }}
          >
            <Text textStyle="subhead-1">View all questions</Text>
          </Button>
        ) : (
          <Flex mt={{ base: '40px', sm: '48px', xl: '58px' }}>
            <Pagination
              totalCount={countData?._all ?? 0}
              pageSize={questionsPerPage}
              onPageChange={handlePageChange}
              currentPage={page}
            />
          </Flex>
        )}
      </Center>
    </>
  )
}

export default PaginatedQuestions
