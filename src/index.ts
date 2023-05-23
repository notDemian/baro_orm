import 'reflect-metadata'

import app from './app'

import { AppDataSource } from '@DB/index'
import { PORT } from '@config/config'

async function main() {
  await AppDataSource.initialize()
  console.log('Database is connected')
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
  })
}

main()
