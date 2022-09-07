import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'

import './index.css' // Remove this when antd is removed
import reportWebVitals from './reportWebVitals'
import { App as AntApp } from './antd/App'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)
export const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* ReactQueryDevtools will not appear in production builds */}
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        {/* A ScrollToTop widget similar to the one from AskGov v1 is needed, */}
        {/* but the approach used with react-router v5 may not work with v6 */}
        {/* https://v5.reactrouter.com/web/guides/scroll-restoration */}
        {/* https://stackoverflow.com/questions/70886149/restore-scroll-position-when-navigating-with-react-router-6 */}
        {/*<ScrollToTop />*/}
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
// root.render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
