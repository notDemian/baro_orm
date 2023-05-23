import { RowDataPacket } from 'mysql2'

export interface SemanasRow extends RowDataPacket {
  semId: number
  semStart: string
  semEnd: string
  usuId: number
}

export interface SumPacket extends RowDataPacket {
  sum: number
}
