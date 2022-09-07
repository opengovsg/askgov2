import wretch, { WretchResponseChain } from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import {
  Answer,
  Officer,
  Question,
  QuestionCount,
  ScreenState,
  Tag,
  User,
  WhoamiResult,
} from '../data'
import { API_BASE_URL } from '../constants'

/**
 * Default API client pointing to backend.
 * Automatically catches 403 errors and invalidates authentication state.
 */
export const api = wretch(API_BASE_URL + '/api/v1')
  .options({ credentials: 'include', mode: 'cors' })
  .addon(QueryStringAddon)
  .catcher(403, (err) => {
    window.dispatchEvent(new Event('unauthorized-event'))
    throw err
  })
  .errorType('json')

export function getWhoami() {
  return api.url(`/auth/whoami`).get().json<WhoamiResult>()
}

export async function getQuestions(tags: string[], screenState?: ScreenState) {
  let url = api.url(`/question`)
  let query: object = {}
  if (tags.length > 0) {
    query = { tag: tags, ...query }
  }
  if (screenState) {
    query = { screenState, ...query }
  }
  return url.query(query).get().json<Question[]>()
}

export async function getApprovedQuestions(tags: string[]) {
  let url = api.url(`/question/approved`)
  let query: object = {}
  if (tags.length > 0) {
    query = { tag: tags, ...query }
  }
  return url.query(query).get().json<Question[]>()
}

export async function getApprovedQuestionsPage(
  page: number,
  questionsPerPage: number,
  tags: string[],
) {
  let url = api.url(`/question/approved`)
  let query: object = { page, questionsPerPage }
  if (tags.length > 0) {
    query = { tag: tags, ...query }
  }
  return url.query(query).get().json<Question[]>()
}

export async function getApprovedQuestionsCount(tags: string[]) {
  let url = api.url(`/question/approved/count`)
  let query: object = {}
  if (tags.length > 0) {
    query = { tag: tags, ...query }
  }
  return url.query(query).get().json<QuestionCount>()
}

export async function getTags(tags: string[]) {
  let url = api.url(`/tag`)
  let query: object = {}
  if (tags.length > 0) {
    query = { tag: tags, ...query }
  }
  return url.query(query).get().json<Tag[]>()
}

export async function postQuestions(body: string, tags: string[]) {
  return api
    .url(`/question`)
    .query({ tag: tags })
    .post({ body })
    .json<Question>()
}

export async function patchScreenState(
  questionId: number,
  screenState: ScreenState,
) {
  return api
    .url(`/question/${questionId}/screen`)
    .patch({ screenState })
    .json<Question>()
}

export async function postAnswer(params: { questionId: number; body: string }) {
  return api.url(`/answer`).post(params).json<Answer>()
}
