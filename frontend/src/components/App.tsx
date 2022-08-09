import React, { FC, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { State, initialState, AppState } from '../data/state'

import { Frame } from './Frame'
import { HomeView } from './HomeView'
import { AuthCallback } from './AuthCallback'
import { AnswerView } from './AnswerView'
import { QuestionView } from './QuestionView'
import { ProfileView } from './ProfileView'
import { ScreenView } from './ScreenView'

import { routes } from '../constants'

export const queryClient = new QueryClient()

export const App: FC = () => {
  const appState = new AppState(useState<State>(initialState))

  return (
    <QueryClientProvider client={queryClient}>
      {/* Only enabled on development*/}
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path={routes.index} element={<Frame appState={appState} />}>
            <Route index element={<HomeView appState={appState} />} />
            <Route path={routes.authCallback} element={<AuthCallback />} />
            <Route
              path={routes.answer}
              element={<AnswerView appState={appState} />}
            />
            <Route
              path={`${routes.question}/:questionId`}
              element={<QuestionView appState={appState} />}
            />
            <Route
              path={`${routes.profile}/:userId`}
              element={<ProfileView appState={appState} />}
            />
            <Route
              path={routes.screen}
              element={<ScreenView appState={appState} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
