import {
  Officer,
  Permission,
  Question,
  ScreenState,
  User,
  WhoamiResult,
} from '../data'

export const mockAuthUrl = {
  url: '#',
}

//////////////////////////////////////////////////////////////
// Users
//////////////////////////////////////////////////////////////

export const mockUserData: User = {
  id: 1,
  openid: 'citizena890123456789',
  createdAt: '2022-08-31T08:58:28.817Z',
  updatedAt: '2022-08-31T08:58:28.817Z',
}

//////////////////////////////////////////////////////////////
// Officers
//////////////////////////////////////////////////////////////

export const mockOfficerData: Officer = {
  id: 8,
  email: 'screener@test.gov.sg',
  createdAt: '2022-08-31T08:58:28.817Z',
  updatedAt: '2022-08-31T08:58:28.817Z',
  permissions: [
    {
      id: 1,
      officerId: 8,
      permission: Permission.SCREEN,
      createdAt: '2022-08-31T08:58:28.817Z',
      updatedAt: '2022-08-31T08:58:28.817Z',
    },
    {
      id: 2,
      officerId: 8,
      permission: Permission.ANSWER,
      createdAt: '2022-08-31T08:58:28.817Z',
      updatedAt: '2022-08-31T08:58:28.817Z',
    },
  ],
}

export const mockOfficerDataScreener: Officer = {
  id: 9,
  email: 'screener@test.gov.sg',
  createdAt: '2022-08-31T08:58:28.817Z',
  updatedAt: '2022-08-31T08:58:28.817Z',
  permissions: [
    {
      id: 3,
      officerId: 9,
      permission: Permission.SCREEN,
      createdAt: '2022-08-31T08:58:28.817Z',
      updatedAt: '2022-08-31T08:58:28.817Z',
    },
  ],
}

export const mockOfficerDataAnswerer: Officer = {
  id: 10,
  email: 'answerer@test.gov.sg',
  createdAt: '2022-08-31T08:58:28.817Z',
  updatedAt: '2022-08-31T08:58:28.817Z',
  permissions: [
    {
      id: 4,
      officerId: 10,
      permission: Permission.ANSWER,
      createdAt: '2022-08-31T08:58:28.817Z',
      updatedAt: '2022-08-31T08:58:28.817Z',
    },
  ],
}

//////////////////////////////////////////////////////////////
// Whoami
//////////////////////////////////////////////////////////////

export const mockedWhoamiLoggedOut: WhoamiResult = {
  currentUser: null,
  currentOfficer: null,
}
export const mockedWhoamiUser: WhoamiResult = {
  currentUser: mockUserData,
  currentOfficer: null,
}
export const mockedWhoamiOfficer: WhoamiResult = {
  currentUser: null,
  currentOfficer: mockOfficerData,
}

//////////////////////////////////////////////////////////////
// Questions
//////////////////////////////////////////////////////////////

const baseQuestionApproved = {
  screenState: ScreenState.APPROVED,
  createdAt: '2022-08-31T08:58:28.817Z',
  authorId: mockUserData.id,
  author: mockUserData,
  uppedBy: [],
  downedBy: [],
  _count: {
    uppedBy: 0,
    downedBy: 0,
    answers: 0,
  },
}

const baseAnswer = {
  createdAt: '2022-08-31T08:58:28.817Z',
  uppedBy: [],
  downedBy: [],
  _count: {
    uppedBy: 0,
    downedBy: 0,
  },
}

const baseAnswerLiked = {
  createdAt: '2022-08-31T08:58:28.817Z',
  uppedBy: [{ createdAt: '2022-08-31T08:58:28.817Z' }],
  downedBy: [],
  _count: {
    uppedBy: 1,
    downedBy: 0,
  },
}

const baseAnswerLikedByUser = {
  createdAt: '2022-08-31T08:58:28.817Z',
  uppedBy: [{ createdAt: '2022-08-31T08:58:28.817Z' }],
  downedBy: [],
  _count: {
    uppedBy: 2,
    downedBy: 0,
  },
}

const baseQuestionAnswered = {
  ...baseQuestionApproved,
  _count: {
    uppedBy: 0,
    downedBy: 0,
    answers: 1,
  },
}

const baseQuestionLiked = {
  ...baseQuestionApproved,
  _count: {
    uppedBy: 1,
    downedBy: 0,
    answers: 0,
  },
}

const baseQuestionLikedByUser = {
  ...baseQuestionApproved,
  uppedBy: [{ createdAt: '2022-08-31T08:58:28.817Z' }],
  _count: {
    uppedBy: 2,
    downedBy: 0,
    answers: 0,
  },
}

const baseQuestionAnsweredLiked = {
  ...baseQuestionApproved,
  _count: {
    uppedBy: 1,
    downedBy: 0,
    answers: 1,
  },
}

const baseQuestionAnsweredLikedByUser = {
  ...baseQuestionApproved,
  uppedBy: [{ createdAt: '2022-08-31T08:58:28.817Z' }],
  _count: {
    uppedBy: 1,
    downedBy: 0,
    answers: 1,
  },
}

export const mockQuestionDataNew: Question = {
  ...baseQuestionApproved,
  id: 1,
  body: 'New Question',
  screenState: ScreenState.NEW,
}

export const mockQuestionDataRejected: Question = {
  ...baseQuestionApproved,
  id: 2,
  body: 'Rejected Question',
  screenState: ScreenState.REJECTED,
}

export const mockQuestionDataApproved: Question = {
  ...baseQuestionApproved,
  id: 2,
  body: 'Aproved Question',
}

export const mockQuestionDataAnswered: Question = {
  ...baseQuestionAnswered,
  id: 3,
  body: 'What financial support schemes are available at WAS?',
  answers: [
    {
      ...baseAnswer,
      id: 1,
      questionId: 3,
      body: 'WAS offers a Jobseeker Allowance Scheme and a Small Business Worker Income Support Package to help with the optimal allocation of work in Singapore.',
    },
  ],
}

export const mockQuestionDataAnsweredLiked: Question = {
  ...baseQuestionAnsweredLiked,
  id: 4,
  body: 'How do I apply for a WAS scheme?',
  answers: [
    {
      ...baseAnswerLiked,
      id: 2,
      questionId: 4,
      body: 'Applicants may go to our official website to submit their applications via the relevant online forms.',
    },
  ],
}

export const mockQuestionDataAnsweredLikedByUser: Question = {
  ...baseQuestionAnsweredLikedByUser,
  id: 5,
  body: 'How long does a WAS financial support scheme application take to process?',
  answers: [
    {
      ...baseAnswerLikedByUser,
      id: 3,
      questionId: 5,
      body: 'Applications typically take 2-3 weeks to process. In cases with complex circumstances, applications may take up to a month.',
    },
  ],
}

export const mockQuestionListDataApproved: Question[] = [
  mockQuestionDataApproved,
  mockQuestionDataAnswered,
  mockQuestionDataAnsweredLiked,
  mockQuestionDataAnsweredLikedByUser,
]

export const mockQuestionCount = {
  _all: 17,
}
