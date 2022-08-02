import wretch from 'wretch'

/**
 * Default API client pointing to backend.
 * Automatically catches 403 errors and invalidates authentication state.
 */
export const api = wretch('/api/v1')
  .catcher(403, (err) => {
    window.dispatchEvent(new Event('unauthorized-event'))
    throw err
  })
  .errorType('json')
