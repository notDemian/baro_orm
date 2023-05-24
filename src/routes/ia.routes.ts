import { Router } from 'express'

import {
  IA_GET_ALL_DIARIOS,
  IA_GET_ALL_FREQ,
  test,
} from '@controllers/ia.controllers'

const router = Router()

router.get('/getAllFreq', IA_GET_ALL_FREQ)
router.get('/getAllDiarios', IA_GET_ALL_DIARIOS)

router.post('/test', test)

export default router
