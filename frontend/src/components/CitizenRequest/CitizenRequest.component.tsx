import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

// import { useGoogleAnalytics } from '../../contexts/googleAnalytics'
import { EnquiryModal } from '../EnquiryModal/EnquiryModal.component'
import { RichTextPreview } from '../RichText/RichTextEditor.component'
import { useStyledToast } from '../StyledToast/StyledToast'

const CitizenRequest = (): JSX.Element => {
  const toast = useStyledToast()
  const {
    onOpen: onEnquiryModalOpen,
    onClose: onEnquiryModalClose,
    isOpen: isEnquiryModalOpen,
  } = useDisclosure()
  // const googleAnalytics = useGoogleAnalytics()
  const agencyName = 'AskGov'

  // const sendOpenEnquiryEventToAnalytics = () => {
  //   googleAnalytics.sendUserEvent(
  //     googleAnalytics.GA_USER_EVENTS.OPEN_ENQUIRY,
  //     agencyName,
  //   )
  // }

  const onClick = async () => {
    onEnquiryModalOpen()
    // sendOpenEnquiryEventToAnalytics()
  }

  const onPostConfirm = async (): Promise<void> => {
    try {
      toast({
        status: 'success',
        description: 'Enquiry email sent',
      })
    } catch (error) {
      toast({
        status: 'error',
        description: 'Error',
      })
    }
  }

  return (
    <Flex
      direction="column"
      h="219px"
      px="24px"
      mt={{ base: '48px', sm: '80px', xl: '90px' }}
      align="center"
      justify="center"
      backgroundColor="secondary.100"
    >
      <Text textStyle="h2" align="center" mb="24px">
        Can't find what you're looking for?
      </Text>
      <Button
        backgroundColor="secondary.700"
        _hover={{
          background: 'secondary.600',
        }}
        borderRadius="4px"
        color="white"
        onClick={onClick}
      >
        Contact Us
      </Button>
      <EnquiryModal isOpen={isEnquiryModalOpen} onClose={onEnquiryModalClose} />
      <Modal isOpen={isEnquiryModalOpen} onClose={onEnquiryModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>More information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RichTextPreview value="AskGov Enquiries are not accepted at this time" />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onEnquiryModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default CitizenRequest
