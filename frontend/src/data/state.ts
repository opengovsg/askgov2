import { Dispatch, SetStateAction } from 'react'
import { User } from './user'
import { Question, ScreenState } from './question'
import { Answer } from './answer'

export interface State {
  users: User[]
  currentUser: number // negative means none
  questions: Question[]
  answers: Answer[]
}

type AppStateProps = [State, Dispatch<SetStateAction<State>>]

// The design of this class is flawed. If the arguments passed to the mutation methods depend on props, there could be trouble.
// https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
// It should work as long as I don't depend on props.
export class AppState {
  private state: AppStateProps[0]
  private setState: AppStateProps[1]
  public constructor([state, setState]: AppStateProps) {
    this.state = state
    this.setState = setState
  }

  getCurrentUser = () => {
    if (
      this.state.currentUser < 0 ||
      this.state.currentUser >= this.state.users.length
    ) {
      return null
    }
    return this.state.users[this.state.currentUser]
  }

  getUserById = (id: number | string) => {
    const userId = typeof id === 'number' ? id : parseInt(id, 10)
    const user = this.state.users.find((u) => u.id === userId)
    if (user) return user
    return null
  }

  setCurrentUser = (value: string) => {
    this.setState((state) => {
      const foundUser = state.users.findIndex((usr) => usr.login == value)
      return { ...state, currentUser: foundUser }
    })
  }

  get questions(): readonly Question[] {
    return this.state.questions
  }

  getQuestionById = (id: number | string) => {
    const questionId = typeof id === 'number' ? id : parseInt(id, 10)
    const question = this.state.questions.find((u) => u.id === questionId)
    if (question) return question
    return null
  }

  getQuestionByUser = (user: User) => {
    return this.state.questions.filter(
      (q) => q.submitter === user,
    ) as readonly Question[]
  }

  addQuestion = (user: User, text: string) => {
    this.setState((state) => {
      let maxId = 1
      state.questions.forEach((q) => {
        maxId = Math.max(q.id, maxId)
      })
      const newQuestion: Question = {
        id: maxId + 1,
        submitter: user,
        body: text,
        createdAt: new Date().toISOString(),
        screenState: ScreenState.NEW,
      }
      return { ...state, questions: [...state.questions, newQuestion] }
    })
  }

  get answers(): readonly Answer[] {
    return this.state.answers
  }

  getAnswerById = (id: number | string) => {
    const answerId = typeof id === 'number' ? id : parseInt(id, 10)
    const answer = this.state.answers.find((u) => u.id === answerId)
    if (answer) return answer
    return null
  }

  getAnswerByQuestion = (question: Question) => {
    return this.state.answers.filter(
      (a) => a.question && a.question.id === question.id,
    ) as readonly Answer[]
  }

  getAnswersByUser = (user: User) => {
    return this.state.answers.filter(
      (a) => a.submitter === user,
    ) as readonly Answer[]
  }

  getOnUpBuilder = (answer: Answer) => {
    return () => {
      //   this.setState((state) => {
      //     return {
      //       ...state,
      //       answers: state.answers.map((a) =>
      //         a.id == answer.id ? { ...a, ups: a.ups + 1 } : a,
      //       ),
      //     }
      //   })
    }
  }

  getOnDownBuilder = (answer: Answer) => {
    return () => {
      //   this.setState((state) => {
      //     return {
      //       ...state,
      //       answers: state.answers.map((a) =>
      //         a.id == answer.id ? { ...a, downs: a.downs + 1 } : a,
      //       ),
      //     }
      //   })
    }
  }
}

// Easy way to assign unique ids.
let id = 0

const users: User[] = [
  {
    id: ++id,
    login: 'citizen',
    name: 'John Q. Citizen',
    canScreen: false,
    canAnswer: false,
    headline: 'Ullam Assumenda Repellat animi amet sint.',
  },
  {
    id: ++id,
    login: 'screener',
    name: 'Linda Lindbloom',
    canScreen: true,
    canAnswer: false,
    headline: 'Omnis ipsa repellendus voluptate ratione veniam minima et.',
  },
  {
    id: ++id,
    login: 'officer',
    name: 'Ho Jing Xian',
    canScreen: true,
    canAnswer: true,
    position: 'Head of Somethingorother for Ministry of Whatnots',
    headline: 'Itaque temporibus repellat modi magni in quia commodi amet.',
  },
]

const questions: Question[] = [
  {
    id: ++id,
    body: 'Dolores illum tempora totam hic sint dolores iure velit dignissimos ut amet consequuntur sint quidem pariatur?',
    submitter: users[0],
    createdAt: '2022-07-20T11:09:04+08:00',
    screenState: ScreenState.APPROVED,
  },
  {
    id: ++id,
    body: 'Corrupti maxime eos non natus. Cumque fugit unde officia eaque et consequatur et facilis?',
    submitter: users[0],
    createdAt: '2022-07-21T11:09:04+08:00',
    screenState: ScreenState.APPROVED,
  },
  {
    id: ++id,
    body: 'Qui aut omnis non aliquid?',
    submitter: users[0],
    createdAt: '2022-07-22T11:09:04+08:00',
    screenState: ScreenState.APPROVED,
  },
  {
    id: ++id,
    body: 'Architecto nulla laboriosam autem rerum dolorum in?',
    submitter: users[0],
    createdAt: '2022-07-23T11:09:04+08:00',
    screenState: ScreenState.APPROVED,
  },
  {
    id: ++id,
    body: 'Sit autem culpa atque tempora id placeat architecto quae temporibus amet est aperiam?',
    submitter: users[0],
    createdAt: '2022-07-26T11:09:04+08:00',
    screenState: ScreenState.NEW,
  },
  {
    id: ++id,
    body: 'Id alias qui totam dicta consequatur est qui at voluptas quia?',
    submitter: users[0],
    createdAt: '2022-07-26T12:09:04+08:00',
    screenState: ScreenState.NEW,
  },
  {
    id: ++id,
    body: 'In iste veniam qui amet iste molestias et nemo occaecati optio?',
    submitter: users[0],
    createdAt: '2022-07-25T11:09:04+08:00',
    screenState: ScreenState.REJECTED,
  },
  {
    id: ++id,
    body: 'Consequatur tenetur et dolores laborum rerum temporibus nemo error. Quas veritatis ut vel illum sed ut officiis ratione libero ab?',
    submitter: users[0],
    createdAt: '2022-07-24T11:09:04+08:00',
    screenState: ScreenState.REJECTED,
  },
]

const answers: Answer[] = [
  {
    id: ++id,
    body:
      'Rem corrupti quod qui id voluptatum dolor expedita quisquam rerum quo aperiam odit veritatis quae. Tempore omnis distinctio aliquid dolor. Neque est vero neque qui qui maiores tempora quae. Mollitia quasi facilis praesentium non et quo voluptatem ipsa. \n' +
      'Perspiciatis ad molestiae nam nihil sed asperiores. Atque ut eum excepturi nesciunt ipsam commodi repellat voluptas. Quia veniam quae voluptatem. Aut nesciunt rerum similique similique possimus.',
    question: questions[0],
    submitter: users[2],
    ups: 21,
    downs: 0,
    createdAt: '2022-07-20T16:09:04+08:00',
  },
  {
    id: ++id,
    body: 'Nemo et blanditiis suscipit libero qui laudantium aliquam alias neque porro velit fuga qui ut. Voluptas delectus sed expedita. Minus quia voluptate fugiat dolor dolorem qui nihil animi nulla et nihil corporis debitis voluptatem. Dolorem perspiciatis recusandae ut ut. Eum laboriosam cupiditate non quidem ullam error quaerat atque. Nam sapiente exercitationem sapiente nobis. Aliquid vel possimus illo qui voluptatem et aut.',
    question: questions[1],
    submitter: users[2],
    ups: 5,
    downs: 13,
    createdAt: '2022-07-21T15:09:04+08:00',
  },
]

export const initialState: State = {
  users,
  currentUser: 0,
  questions,
  answers,
}
