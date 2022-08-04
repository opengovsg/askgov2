import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import { Question, ScreenState } from '../data/question'

/**
 * Default API client pointing to backend.
 * Automatically catches 403 errors and invalidates authentication state.
 */
export const api = wretch('/api/v1')
  .addon(QueryStringAddon)
  .catcher(403, (err) => {
    window.dispatchEvent(new Event('unauthorized-event'))
    throw err
  })
  .errorType('json')

export async function getQuestions(screenState?: ScreenState) {
  let url = api.url(`/question`)
  if (screenState) {
    url = url.query({ screenState })
  }
  return url.get().json<Question[]>()
}

export async function postQuestions(body: string) {
  return api.url(`/question`).post({ body }).json<Question>()
}
