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
import { gastosRoutes } from '@utils/ROUTES'

const router = Router()

router.post(gastosRoutes.createGastoDiario, [authUser], createGastoDiario)
router.get(gastosRoutes.getGastos, [authUser], getGastos)
router.get(gastosRoutes.getSemanas, [authUser], getSemanas)
router.get(gastosRoutes.getDay, [authUser], getDay)
router.post(gastosRoutes.updateGasto, [authUser], updateGasto)

export default router
