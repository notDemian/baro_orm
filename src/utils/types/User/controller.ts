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

export const BARO_SUBSCRIPTIONS = {
  B2C_Baro_Essentials: 'B2C_Baro_Essentials',
  B2C_Baro_Deluxe: 'B2C_Baro_Deluxe',
  B2C_Baro_AI: 'B2C_Baro_AI',
  B2C_Baro_Family: 'B2C_Baro_Family',
} as const
export type SUBSCRIPTIONS = keyof typeof BARO_SUBSCRIPTIONS

export const PROFILES = {}

export type Profile = keyof typeof PROFILES
