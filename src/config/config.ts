import { config } from 'dotenv'

config()

export const NODE_ENV = process.env.NODE_ENV
const IS_DEV = false
// NODE_ENV === 'dev'
export const PORT = process.env.PORT
export const SECRET = process.env.SECRET || 'secret'
export const MYSQLDATABASE = IS_DEV ? 'baro' : process.env.MYSQLDATABASE
export const MYSQLUSER = IS_DEV ? 'root' : process.env.MYSQLUSER
export const MYSQLPASSWORD = IS_DEV ? '554721' : process.env.MYSQLPASSWORD
export const MYSQLHOST = IS_DEV ? 'localhost' : process.env.MYSQLHOST
export const MYSQLPORT = IS_DEV
  ? 3306
  : parseInt(process.env.MYSQLPORT || '3306')

export const API_IA_URL = IS_DEV
  ? 'http://192.168.19.73:5000'
  : 'https://services-ia-baro.up.railway.app'
