import React, { FC, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, initialState, AppState } from '../data/state'

import { Frame } from './Frame'
import { HomeView } from './HomeView'
import { AnswerView } from './AnswerView'
import { QuestionView } from './QuestionView'
import { ProfileView } from './ProfileView'
import { ScreenView } from './ScreenView'

export const queryClient = new QueryClient()

export const App: FC = () => {
  const appState = new AppState(useState<State>(initialState))

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frame appState={appState} />}>
            <Route index element={<HomeView appState={appState} />} />
            <Route path="answer" element={<AnswerView appState={appState} />} />
            <Route
              path="question/:questionId"
              element={<QuestionView appState={appState} />}
            />
            <Route
              path="profile/:userId"
              element={<ProfileView appState={appState} />}
            />
            <Route path="screen" element={<ScreenView appState={appState} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
