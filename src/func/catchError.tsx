import { ilogError } from './Logging'

/* eslint-disable import/prefer-default-export */
export function catchError(e: any): Error {
  if (e instanceof TypeError
        || e instanceof RangeError
        || e instanceof EvalError
        || e instanceof Error
  ) {
    return e
  } if (typeof e === 'string') {
    return new Error(e)
  }
  ilogError('Unhandled error type', e)
  return new Error(`Unhandled error type. ${typeof e}`)
}
