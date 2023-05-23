import type { RowDataPacket } from 'mysql2'

export type GeneralUser = {
  id: number
  email: string
  name: string
  photo: string
  profile: number
  balance: number
}

export interface UserRowData extends RowDataPacket {
  usuId: number
  usuEmail: string
  usuPassword: string
}

export type DataUserRow = {
  datId: number
  datName: string
  datPhoto: string
  datProfile: number
  datBalance: number
  usuId: number
}

export type DataUserRowData = RowDataPacket & DataUserRow

export type DataUserRowPick<T extends keyof DataUserRow> = RowDataPacket &
  Pick<DataUserRow, T>
