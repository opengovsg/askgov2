export function asErr(e: unknown): Error {
  if (typeof e === 'object' && e instanceof Error) {
    return e
  } else {
    const err = new Error(
      'Sorry, something went wrong. Please refresh and try again.',
    )
    err.cause = new Error(JSON.stringify(e, null, 2))
    return err
  }
}
