import moment, { Moment } from 'moment'
import type { RowDataPacket } from 'mysql2'

export const LAPSES_TO_INT = {
  Semanal: (date: Moment | string) => moment(date).add(1, 'week'),
  Quincenal: (date: Moment | string) => moment(date).add(2, 'week'),
  Mensual: (date: Moment | string) => moment(date).add(1, 'month'),
  Bimestral: (date: Moment | string) => moment(date).add(2, 'month'),
  Trimestral: (date: Moment | string) => moment(date).add(3, 'month'),
}

export type LAPSES_TYPE = typeof LAPSES_TO_INT
export type LAPSES = keyof LAPSES_TYPE
export type COLORS_FREQ = 'Light' | 'Medium' | 'Hard'

export interface Frecuente {
  freId: number
  freName: string
  freDescription: string
  freAmount: number
  freLapse: LAPSES
  dayId: number
  usuId: number
}

export type FrecuenteRow = Frecuente & RowDataPacket

export interface Cobros_FreRow extends RowDataPacket {
  cobId: number
  cobDate: string
  freId: number
}

export type FrecuenteRow2 = Omit<FrecuenteRow, 'dayId' | 'usuId'>

export type GastoFrecuente = {
  name: string
  isStatic: boolean
  amount: number
  lapse: LAPSES
  date: string
  description?: string
}
