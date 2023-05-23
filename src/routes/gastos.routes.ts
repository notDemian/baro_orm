import { Router } from 'express'

import '@controllers/gastos.controllers'
import {
  createGastoDiario,
  getDay,
  getGastos,
  getSemanas,
  updateGasto,
} from '@controllers/gastos.controllers'

const router = Router()

router.post('/createGastoDiario', createGastoDiario)
router.get('/getGastos', getGastos)
router.get('/getSemanas/:semana?', getSemanas)
router.get('/getDay/:day?', getDay)
router.post('/updateGasto', updateGasto)

export default router
