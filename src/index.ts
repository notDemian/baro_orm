import moment from 'moment-timezone'
import 'moment/locale/es'
import 'reflect-metadata'

import App from './app'

moment.locale('es')
moment.tz.setDefault('America/Mexico_City')

const app = new App()

app.init()
