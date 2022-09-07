import React, { FC, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Frame } from './Frame'
import { HomeView } from './HomeView'
import { AuthCallback } from './AuthCallback'
import { AnswerView } from './AnswerView'
import { QuestionView } from './QuestionView'
import { ProfileView } from './ProfileView'
import { ScreenView } from './ScreenView'
import { IFrameView } from './IFrameView'

import { PRIVACY_URL, routes, TERMS_URL } from '../constants'
import { OfficerView } from './OfficerView'

export const App: FC = () => {
  return (
    <Routes>
      <Route path={routes.antbase} element={<Frame />}>
        <Route index element={<HomeView />} />
        <Route path={routes.authCallback} element={<AuthCallback />} />
        <Route path={routes.answer} element={<AnswerView />} />
        <Route
          path={`${routes.question}/:questionId`}
          element={<QuestionView />}
        />
        <Route path={`${routes.officer}`} element={<OfficerView />} />
        <Route path={`${routes.profile}/:userId`} element={<ProfileView />} />
        <Route path={routes.screen} element={<ScreenView />} />
        <Route
          path={routes.termsOfUse}
          element={<IFrameView src={TERMS_URL} />}
        />
        <Route
          path={routes.privacyStatement}
          element={<IFrameView src={PRIVACY_URL} />}
        />
      </Route>
    </Routes>
  )
}
