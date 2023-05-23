import moment, { Moment } from 'moment'

export const FORMATS = {
  SIMPLE_DATE: 'YYYY-MM-DD',
} as const

export type FORMATS = (typeof FORMATS)[keyof typeof FORMATS]

export function getSemEnd(date?: Date | Moment | string): Moment {
  moment.locale('es')
  const dateEnd = moment(date)
  if (!dateEnd.isValid()) {
    return moment().endOf('week')
  }
  return dateEnd.endOf('week')
}

export function getSemStart(date?: Date | Moment | string): Moment {
  moment.locale('es')
  const dateStart = moment(date)
  if (!dateStart.isValid()) {
    return moment().startOf('week')
  }
  return dateStart.startOf('week')
}
