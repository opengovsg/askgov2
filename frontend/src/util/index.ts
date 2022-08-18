export function asErr(e: unknown): Error {
  if (typeof e === 'object') {
    if (e instanceof Error) {
      return e
    } else {
      return new Error(`Unknown error: ${JSON.stringify(e, null, 2)}`)
    }
  } else {
    return new Error(`Unknown error: ${e}`)
  }
}