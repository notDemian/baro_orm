import { config } from 'dotenv'

config()

export const NODE_ENV = process.env.NODE_ENV
const IS_DEV = NODE_ENV === 'dev'
export const PORT = process.env.PORT
export const SECRET = process.env.SECRET || 'secret'
export const MYSQLDATABASE = IS_DEV ? 'baro' : process.env.MYSQLDATABASE
export const MYSQLUSER = IS_DEV ? 'root' : process.env.MYSQLUSER
export const MYSQLPASSWORD = IS_DEV ? '554721' : process.env.MYSQLPASSWORD
export const MYSQLHOST = IS_DEV ? 'localhost' : process.env.MYSQLHOST
export const MYSQLPORT = IS_DEV
  ? 3306
  : parseInt(process.env.MYSQLPORT || '3306')
