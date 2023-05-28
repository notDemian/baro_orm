import { Router } from 'express'

import {
  GET_CLASSIFICATIONS_IA,
  IA_GET_ALL_DIARIOS,
  IA_GET_ALL_FREQ,
  test,
} from '@controllers/ia.controllers'
import { authUser } from '@middlewares/ErrorHandlers/Errors'

const router = Router()

router.get('/getAllFreq', IA_GET_ALL_FREQ)
router.get('/getAllDiarios', IA_GET_ALL_DIARIOS)
router.get('/getClassifications', [authUser], GET_CLASSIFICATIONS_IA)

router.post('/test', test)

export default router
