import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import { Question, ScreenState } from '../data/question'
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

export async function postQuestions(body: string, tags: string[]) {
  return api
    .url(`/question`)
    .query({ tag: tags })
    .post({ body })
    .json<Question>()
}
