/* eslint-disable import/prefer-default-export */
import { ilogError } from './Logging'

export async function liveMutate(
  endpoint: string,
) {
  return fetch(endpoint).then((d) => d.json()).then((j) => {
    if (j.error) {
      // eslint-disable-next-line no-alert
      alert(j.error)
    }
  })
    .catch((e) => ilogError('ERROR', e))
}
