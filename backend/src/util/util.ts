import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common'

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

export function asHttpErr(
  e: unknown,
  defaultStatus: number = HttpStatus.INTERNAL_SERVER_ERROR,
): HttpException {
  if (typeof e === 'object') {
    if (e instanceof HttpException) {
      return e
    } else if (e instanceof Error) {
      const eNew = new HttpException(e.message, defaultStatus)
      eNew.cause = e
      return eNew
    } else {
      return new HttpException(
        `Internal Server Error: ${JSON.stringify(e, null, 2)}`,
        defaultStatus,
      )
    }
  } else {
    return new HttpException(`Internal Server Error: ${e}`, defaultStatus)
  }
}
