import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { join } from 'path'

// Routes
import frecuentesRoutes from './routes/frecuentes.routes'
import gastosRoutes from './routes/gastos.routes'
import iaRoutes from './routes/ia.routes'
import ingresosRoutes from './routes/ingresos.routes'
import userRoutes from './routes/user.routes'
import { AppDataSource } from './DB'
import { PORT } from '@config/config'

class App {

  app: express.Application;
  readonly __public = join(__dirname, '/public')

  constructor(){
    this.app = express();
    this.config();
    this.setRoutes();
    this.setMiddlewares();
  }

  config(){
    this.app.use(express.static(this.__public))
    this.app.use(cors({ credentials: true, origin: true }))
    this.app.use(morgan('dev'))
    this.app.use(express.json())
  }

  setRoutes(){
    this.app.use('/api/users', userRoutes)
    this.app.use('/api/ingresos', ingresosRoutes)
    this.app.use('/api/gastos', gastosRoutes)
    this.app.use('/api/frecuentes', frecuentesRoutes)
    this.app.use('/api/ia', iaRoutes)
  }

  setMiddlewares(){
    // this.app.use()
  } 

  async init(){
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