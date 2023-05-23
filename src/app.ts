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

const __public = join(__dirname, '/public')

const app = express()

// Middlewares
app.use(express.static(__public))
app.use(cors({ credentials: true, origin: true }))
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/ingresos', ingresosRoutes)
app.use('/api/gastos', gastosRoutes)
app.use('/api/frecuentes', frecuentesRoutes)
app.use('/api/ia', iaRoutes)

export default app
