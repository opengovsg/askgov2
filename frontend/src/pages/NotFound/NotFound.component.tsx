import { Fragment } from 'react'
import { Link as ReachLink } from 'react-router-dom'
import { Button, Center, Flex, Heading, Spacer, Text } from '@chakra-ui/react'

import { BackToHome } from '../../components/BackToHome/BackToHome'
import { usePathGenerator } from '../../util'

const NotFound = (): JSX.Element => {
  const pagePX = { base: 8, md: 12 }
  const pathGen = usePathGenerator()
  return (
    <Fragment>
      <Flex
        mt={{ base: '32px', sm: '60px' }}
        mb={{ base: '32px', sm: '50px' }}
        px={pagePX}
      >
        <BackToHome pathGenerator={pathGen} />
      </Flex>
      <Flex direction="column" px={pagePX}>
        <Heading textAlign="center" size="4xl">
          Not Found
        </Heading>
        <Spacer minH={10} />
        <Text align="center">
          It seems like we couldn't find the page you were looking for.
        </Text>
        <Spacer minH={10} />
        <Center>
          <Button as={ReachLink} to={pathGen.get()}>
            Back to home page
          </Button>
        </Center>
      </Flex>
      <Spacer />
    </Fragment>
  )
}

export default NotFound
