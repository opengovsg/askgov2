import { Link as RouterLink } from 'react-router-dom'
import { Box, Flex, Link, useMultiStyleConfig } from '@chakra-ui/react'
import sanitizeHtml from 'sanitize-html'

import { Question } from '../../data'
import { useAuth } from '../../contexts/AuthContext'

// Note: QuestionListItem is the component for the homepage
const QuestionListItem = ({
  question: { id, body, createdAt, answers, _count, uppedBy },
}: {
  question: Pick<
    Question,
    'id' | 'body' | 'createdAt' | 'answers' | '_count' | 'uppedBy'
  >
}): JSX.Element => {
  const { currentUser: user } = useAuth()
  const styles = useMultiStyleConfig('QuestionListItem', {})

  return (
    <Flex sx={styles.container}>
      {/* Title display area */}
      {/*<Link as={RouterLink} to={`/questions/${id}`}>*/}
      {<Box sx={styles.linkText}>{body}</Box>}
      {
        <Box sx={styles.answer}>
          {answers && answers.length > 0 && answers[0].body}
        </Box>
      }
      {/*</Link>*/}
      {/*<Box sx={styles.description}>*/}
      {/*  description && <RichTextFrontPreview value={description} /> */}
      {/*</Box>*/}
    </Flex>
  )
}

export default QuestionListItem
