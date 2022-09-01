import { Route, Routes } from 'react-router-dom'

// import {
//   AgencyPrivacy,
//   AgencyTerms,
//   CitizenPrivacy,
//   CitizenTerms,
// } from './components/PrivacyTerms'
// import AgencyHomePageWrapper from './pages/AgencyHomePage/AgencyHomePageWrapper.component'
// import EditForm from './pages/EditForm/EditForm.component'
import HomePage from './pages/HomePage/HomePage.component'
// import Login from './pages/Login/Login.component'
// import NotFound from './pages/NotFound/NotFound.component'
// import Post from './pages/Post/Post.component'
// import PostForm from './pages/PostForm/PostForm.component'
// import SearchResults from './pages/SearchResults/SearchResults.component'
import withPageTitle from './services/withPageTitle'
import { PRIVACY_URL, routes, TERMS_URL } from './constants'
import { Frame } from './antd/Frame'
import { HomeView } from './antd/HomeView'
import { AuthCallback } from './antd/AuthCallback'
import { AnswerView } from './antd/AnswerView'
import { QuestionView } from './antd/QuestionView'
import { OfficerView } from './antd/OfficerView'
import { ProfileView } from './antd/ProfileView'
import { ScreenView } from './antd/ScreenView'
import { IFrameView } from './antd/IFrameView'
import React from 'react'
import NotFound from './pages/NotFound/NotFound.component'
import PageFrame from './pages/PageFrame/PageFrame.component'
import { Privacy, Terms } from './components/PrivacyTerms'

const HomePageComponent = withPageTitle({
  component: HomePage,
})

// const AgencyHomePageComponent = withPageTitle({
//   component: AgencyHomePageWrapper,
// })
//
// const SearchResultsComponent = withPageTitle({
//   component: SearchResults,
//   title: 'Search Results - AskGov',
// })
//
// const LoginComponent = withPageTitle({
//   component: Login,
//   title: 'Log In - AskGov',
// })
//
// const PostFormComponent = withPageTitle({
//   component: PostForm,
//   title: 'Ask a Question - AskGov',
// })
//
// const EditFormComponent = withPageTitle({
//   component: EditForm,
//   title: 'Edit Question - AskGov',
// })

const NotFoundComponent = withPageTitle({
  component: NotFound,
  title: 'Error 404',
})

// const PostComponent = withPageTitle({
//   component: Post,
// })

const TermsComponent = withPageTitle({
  component: Terms,
  title: 'Terms of Use',
})

const PrivacyComponent = withPageTitle({
  component: Privacy,
  title: 'Privacy',
})

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path={routes.base} element={<PageFrame />}>
        <Route index element={<HomePageComponent />} />
        {/*<Route path="/agency/:agency" element={<AgencyHomePageComponent />} />*/}
        {/*<Route path="/questions" element={<SearchResultsComponent />} />*/}
        {/*<Route path="/login" element={<LoginComponent />} />*/}
        {/*<Route path="/questions/:id" element={<PostComponent />} />*/}
        {/*<Route path="/add/question" element={<PostFormComponent />} />*/}
        {/*<Route path="/edit/question/:id" element={<EditFormComponent />} />*/}
        <Route path={routes.termsOfUse} element={<TermsComponent />} />
        <Route path={routes.privacyStatement} element={<PrivacyComponent />} />
        <Route path="*" element={<NotFoundComponent />} />
      </Route>
      <Route path={routes.authCallback} element={<AuthCallback />} />
      <Route path={routes.antbase} element={<Frame />}>
        <Route index element={<HomeView />} />
        <Route path={routes.answer} element={<AnswerView />} />
        <Route path={routes.question} element={<QuestionView />} />
        <Route path={routes.officer} element={<OfficerView />} />
        <Route path={routes.profile} element={<ProfileView />} />
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

export default AppRoutes
