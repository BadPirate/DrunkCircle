import { firstString } from './queryParsing'

/* eslint-disable import/prefer-default-export */
type ParamDict = { [key: string]: string | number | string[] | undefined }
export function encodeQueryString(params: ParamDict) {
  return Object.keys(params).flatMap((k) => {
    const v = params[k]
    if (!v) return null
    if (typeof v === 'number' || typeof v === 'string') {
      return `${k}=${encodeURIComponent(v)}`
    }
    return firstString(v)
  }).join('&')
}
