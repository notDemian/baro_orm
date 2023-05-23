import type { RowDataPacket } from 'mysql2'

export interface Day {
  dayId: number
  dayDate: string
  semId: number
}

export type DayRow = Day & RowDataPacket

export interface DiariosRow extends RowDataPacket {
  diaId: number
  diaName: string
  diaDescription: string
  diaAmount: number
  dayId: number
}

export interface IngresosRow extends RowDataPacket {
  ingId: number
  ingDate: string
  ingType: string
  ingAmount: number
  ingDescription: string
  usuId: number
}

export interface SUM extends RowDataPacket {
  sum: number
}

export const LIMITS = {
  LVL1: 50,
  LVL2: 100,
  LVL3: 200,
  LVL4: 500,
} as const
export type LIMIT_TYPE = (typeof LIMITS)[keyof typeof LIMITS]
