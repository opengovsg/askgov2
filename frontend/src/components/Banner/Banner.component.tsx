import { Box } from '@chakra-ui/layout'

// type bannerDataType =
//   | {
//       // bannerMessage: string
//       // googleAnalyticsId: string
//     }
//   | undefined

export const Banner =
  (/* props: { data: bannerDataType, isSuccess: boolean } */): JSX.Element | null => {
    const bannerMessage =
      'Note: This website is in a testing state. Send us feedback at <askgov@open.gov.sg>'
    return bannerMessage ? (
      <Box
        h="50px"
        minH="50px"
        color="neutral.100"
        zIndex="2000"
        background="primary.500"
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="banner"
        fontWeight="medium"
      >
        {bannerMessage}
      </Box>
    ) : null
  }
