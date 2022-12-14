import { ChakraProvider } from '@chakra-ui/react'

// import { Banner } from './components/Banner/Banner.component'
// import Footer from './components/Footer/Footer.component'
// import Header from './components/Header/Header.component'
import { AuthProvider } from './contexts/AuthContext'
// import { GoogleAnalyticsProvider } from './contexts/googleAnalytics'
// import { useEnvironment } from './hooks/useEnvironment'
import Routes from './AppRoutes'
import { theme } from './theme'

const App = (): JSX.Element => {
  // const { data, isSuccess } = useEnvironment()

  return (
    // <GoogleAnalyticsProvider>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <>
          {/*<Banner data={data} isSuccess={isSuccess} />*/}
          {/*<Header />*/}
          <Routes />
          {/*<Footer />*/}
        </>
      </AuthProvider>
    </ChakraProvider>
    // </GoogleAnalyticsProvider>
  )
}

export default App
