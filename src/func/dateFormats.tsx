/* eslint-disable import/prefer-default-export */
import dateFormat from 'dateformat'

export const trailDateFormat = (date: Date | string | number) => dateFormat(date, 'dddd, mmmm dS')
