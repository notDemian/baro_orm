import { Router } from 'express'

import {
  GET_CLASSIFICATIONS_IA,
  GET_PREDICTIONS_IA,
  IA_GET_ALL_DIARIOS,
  IA_GET_ALL_FREQ,
  test,
} from '@controllers/ia.controllers'
import { authUser } from '@middlewares/ErrorHandlers/Errors'
import { iaRoutes } from '@utils/ROUTES'

const router = Router()

router.get(iaRoutes.getAllFreq, IA_GET_ALL_FREQ)
router.get(iaRoutes.getAllDiarios, IA_GET_ALL_DIARIOS)
router.get(iaRoutes.getClassifications, [authUser], GET_CLASSIFICATIONS_IA)
router.get(iaRoutes.getPredictions, [authUser], GET_PREDICTIONS_IA)

router.post(iaRoutes.test, test)

export default router
