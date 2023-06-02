import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { join } from 'path'

import { AppDataSource } from './DB'
// Routes
import frecuentesRoutes from './routes/frecuentes.routes'
import gastosRoutes from './routes/gastos.routes'
import iaRoutes from './routes/ia.routes'
import ingresosRoutes from './routes/ingresos.routes'
import userRoutes from './routes/user.routes'

import { PORT } from '@config/config'
import { listenFreq } from '@middlewares/Freq_Interceptors/main'
import { not_midd_exp } from '@middlewares/Freq_Interceptors/not_midd'
import ROUTES from '@utils/ROUTES'

class App {
  app: express.Application
  readonly __public = join(__dirname, '/public')

  constructor() {
    this.app = express()
    this.config()
    this.setMiddlewares()
    this.setRoutes()
  }

  config() {
    this.app.use(express.static(this.__public))
    this.app.use(cors({ credentials: true, origin: true }))
    this.app.use(morgan('dev'))
    this.app.use(express.json())
  }

  setRoutes() {
    this.app.use(listenFreq)
    this.app.use(not_midd_exp)

    // this.app.use(not_midd_hijack)
    // this.app.use(not_midd)

    this.app.use(ROUTES.main.users, userRoutes)
    this.app.use(ROUTES.main.ingresos, ingresosRoutes)
    this.app.use(ROUTES.main.gastos, gastosRoutes)
    this.app.use(ROUTES.main.frecuentes, frecuentesRoutes)
    this.app.use(ROUTES.main.ia, iaRoutes)
  }

  setMiddlewares() {}

  async init() {
    try {
      await AppDataSource.initialize()
      console.log('Database is connected')
      this.app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`)
      })
    } catch (error) {
      console.log('Error connecting to Database', error)
    }
  }
}

export default App
