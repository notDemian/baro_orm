import { Router } from 'express'

import '@controllers/gastos.controllers'
import {
  createGastoDiario,
  getDay,
  getGastos,
  getSemanas,
  updateGasto,
} from '@controllers/gastos.controllers'
import { authUser } from '@middlewares/ErrorHandlers/Errors'

const router = Router()

router.post('/createGastoDiario', [authUser], createGastoDiario)
router.get('/getGastos', [authUser], getGastos)
router.get('/getSemanas/:semana?', [authUser], getSemanas)
router.get('/getDay/:day?', [authUser], getDay)
router.post('/updateGasto', [authUser], updateGasto)

export default router
