export function firstString(param: string | string[] | null | undefined): string | null {
  if (!param) { return null }
  if (Array.isArray(param)) {
    return param.length > 0 ? param[0] : null
  }
  return param
}

export function requireString(name: string, param: string | string[] | null): string {
  const s = firstString(param)
  if (!s) { throw Error(`${name} required`) }
  if (s.length === 0) { throw Error(`${name} must be longer than 0`) }
  return s
}

export type QParams = { [key: string]: string | string[] | undefined; }

export function queryToStrings(params: QParams): { [key: string]: string; } {
  const result: { [key: string]: string; } = {}
  Object.keys(params).forEach((k) => {
    const element = firstString(params[k])
    if (element) {
      result[k] = element
    }
  })
  return result
}

export function queryToFloat(params: QParams): { [key: string]: number; } {
  const result: { [key: string]: number; } = {}
  const strings = queryToStrings(params)
  Object.keys(strings).forEach((k) => {
    result[k] = parseFloat(strings[k])
  })
  return result
}

export function queryToInt(params: QParams): { [key: string]: number; } {
  const result: { [key: string]: number; } = {}
  const strings = queryToStrings(params)
  Object.keys(strings).forEach((k) => {
    result[k] = parseInt(strings[k], 10)
  })
  return result
}

export function queryToBool(params: QParams): { [key: string]: boolean } {
  const result: { [key: string]: boolean; } = {}
  const strings = queryToStrings(params)
  Object.keys(strings).forEach((k) => {
    result[k] = strings[k] === 'true'
  })
  return result
}

export function requireAll(params: { [key: string]: any }) {
  Object.keys(params).forEach((k) => {
    if (params[k] === undefined || params[k] === null) throw new Error(`${k} is required`)
  })
}
