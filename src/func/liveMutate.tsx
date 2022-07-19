/* eslint-disable import/prefer-default-export */
import { ilogError } from './Logging'
import { QParams } from './queryParsing'

export async function liveMutate(
  endpoint: string,
) {
  return fetch(endpoint).then((d) => d.json()).then((j : QParams) => {
    if (j.error) {
      // eslint-disable-next-line no-alert
      alert(j.error)
    }
    return j
  })
    .catch((e) => ilogError('Live Mutate Error', e))
}
