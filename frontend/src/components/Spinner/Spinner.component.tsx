import {
  Center,
  Spinner as ChakraSpinner,
  SpinnerProps as ChakraSpinnerProps,
} from '@chakra-ui/react'

interface SpinnerProps extends ChakraSpinnerProps {
  centerWidth?: string | number
  centerHeight?: string | number
}

const Spinner = (props: SpinnerProps): JSX.Element => {
  return (
    <Center w={props.centerWidth} h={props.centerHeight}>
      <ChakraSpinner w={props.centerWidth} h={props.centerHeight} />
    </Center>
  )
}

export default Spinner
