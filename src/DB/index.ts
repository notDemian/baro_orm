import { CobrosFreq } from '@entitys/CobrosFreq'
import { DataUser } from '@entitys/DataUser'
import { Day } from '@entitys/Day'
import { Diarios } from '@entitys/Diarios'
import { Frecuentes } from '@entitys/Frecuentes'
import { Ingresos } from '@entitys/Ingresos'
import { Semanas } from '@entitys/Semanas'
import { User } from '@entitys/User'
import { DataSource } from 'typeorm'

import {
  MYSQLDATABASE,
  MYSQLHOST,
  MYSQLPASSWORD,
  MYSQLPORT,
  MYSQLUSER,
} from '@config/config'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: MYSQLHOST,
  port: MYSQLPORT,
  username: MYSQLUSER,
  password: MYSQLPASSWORD,
  database: MYSQLDATABASE,
  entities: [
    User,
    DataUser,
    Semanas,
    Day,
    Diarios,
    Frecuentes,
    CobrosFreq,
    Ingresos,
  ],
  // logging: true,
  synchronize: true,
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations_bd_baro',
})
