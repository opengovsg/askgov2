import { BiArrowBack } from 'react-icons/bi'
import { Link as RouterLink } from 'react-router-dom'
import { Center, Link, Text } from '@chakra-ui/react'
import { PathGenerator } from '../../util'

export const BackToHome = ({
  pathGenerator,
}: {
  pathGenerator: PathGenerator
}): JSX.Element => {
  return (
    <Link as={RouterLink} to={pathGenerator.get()}>
      <Center color="secondary.800">
        <BiArrowBack style={{ marginRight: '14px' }} size="13.41px" />
        <Text textStyle="body-1">Back to home</Text>
      </Center>
    </Link>
  )
}
