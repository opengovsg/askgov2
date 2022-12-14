import { AuthProvider } from '../src/contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'
import { theme } from '../src/theme'
import { ChakraProvider } from '@chakra-ui/react'
import * as React from 'react'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { rest } from 'msw'
import { HelmetProvider } from 'react-helmet-async'
// import { MockUserData } from '../src/__mocks__/mockData'
import { breakpoints } from '../src/theme/breakpoints'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { API_BASE_URL } from '../src/constants'
import { mockAuthUrl, mockedWhoamiUser } from '../src/__mocks__/mockData'

// Initialize Mock Service Worker
initialize()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const withChakra = (StoryFn: Function) => {
  return (
    // <ChakraProvider theme={theme}>
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthProvider>
          <HelmetProvider>
            <StoryFn />
          </HelmetProvider>
        </AuthProvider>
      </QueryClientProvider>
    </MemoryRouter>
    // </ChakraProvider>
  )
}

export const decorators = [withChakra, mswDecorator]

const customViewports = {
  xs: {
    name: 'xs',
    styles: {
      width: breakpoints.xs,
      height: '601px',
    },
  },
  sm: {
    name: 'sm',
    styles: {
      width: breakpoints.sm,
      height: '601px',
    },
  },
  md: {
    name: 'md',
    styles: {
      width: breakpoints.md,
      height: '801px',
    },
  },
  lg: {
    name: 'lg',
    styles: {
      width: breakpoints.lg,
      height: '801px',
    },
  },
  xl: {
    name: 'xl',
    styles: {
      width: breakpoints.xl,
      height: '801px',
    },
  },
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: { theme },
  viewport: {
    viewports: customViewports,
  },
  msw: {
    handlers: {
      loginUrl: [
        rest.get(API_BASE_URL + '/api/v1/auth/url', (_req, res, ctx) => {
          return res(ctx.json(mockAuthUrl))
        }),
      ],
      auth: [
        rest.get(API_BASE_URL + '/api/v1/auth/whoami', (_req, res, ctx) => {
          return res(ctx.json(mockedWhoamiUser))
        }),
      ],
    },
  },
}
