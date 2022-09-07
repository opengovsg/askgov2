import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Text } from '@chakra-ui/react'

// import { useGoogleAnalytics } from '../../contexts/googleAnalytics'
import QuestionListItem from '../QuestionListItem/QuestionListItem.component'
import { Question } from '../../data'

const QuestionList = ({
  questions,
  defaultText,
}: {
  questions?: Question[]
  defaultText?: string
}): JSX.Element => {
  defaultText = defaultText ?? 'There are no questions to display.'

  // // Creates reference for maxScroll variable with initial value of 0
  // const maxScroll = useRef(0)
  //
  // // const googleAnalytics = useGoogleAnalytics()
  // const updateMaxScroll = () => {
  //   maxScroll.current = Math.max(maxScroll.current, window.pageYOffset)
  // }
  //
  // const sendMaxScrollToAnalytics = (maxScrollPossible: number) => {
  //   // The following is required to restrict the percentage to 100 due to browser compatibility issues:
  //   // https://stackoverflow.com/questions/17688595/finding-the-maximum-scroll-position-of-a-page
  //   maxScrollPossible = Math.max(maxScrollPossible, maxScroll.current)
  //   const maxScrollPercentage = Math.floor(
  //     (maxScroll.current / maxScrollPossible) * 100,
  //   )
  //   googleAnalytics.sendUserEvent(
  //     googleAnalytics.GA_USER_EVENTS.BROWSE,
  //     agencyShortName,
  //     maxScrollPercentage,
  //   )
  // }
  //
  // const removeListenerAndSendEvent = (maxScrollPossible: number) => {
  //   window.removeEventListener('scroll', updateMaxScroll)
  //   if (maxScroll.current !== 0) sendMaxScrollToAnalytics(maxScrollPossible)
  // }
  //
  // // On component mount (i.e. first render), attach an event listener to update maxScroll on scroll and
  // // get the maximum scroll possible on the page. This hook installs a callback that gets triggered only
  // // when the component unmounts as well, where a cleanup function is fired to remove the event listener
  // // as well as send event with percentage of page scrolled to analytics.
  // useEffect(() => {
  //   window.addEventListener('scroll', updateMaxScroll)
  //   // Due to browser compatibility issues, there is no single source of truth for maximum scroll height:
  //   // https://stackoverflow.com/questions/17688595/finding-the-maximum-scroll-position-of-a-page
  //   const pageHeight = Math.max(
  //     document.body.scrollHeight,
  //     document.body.offsetHeight,
  //     document.documentElement.clientHeight,
  //     document.documentElement.scrollHeight,
  //     document.documentElement.offsetHeight,
  //   )
  //   const maxScrollPossible = pageHeight - window.innerHeight
  //   return () => removeListenerAndSendEvent(maxScrollPossible)
  // }, [])

  return (
    <div className="question-list">
      {questions && questions.length > 0 ? (
        <div className="questions">
          {questions.map((question) => (
            <QuestionListItem key={question.id} question={question} />
          ))}
        </div>
      ) : (
        <Text color="secondary.800" textStyle="h4" py={4}>
          {defaultText}
        </Text>
      )}
    </div>
  )
}

export default QuestionList
