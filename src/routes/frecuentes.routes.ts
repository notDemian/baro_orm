import { Router } from 'express'

import {
  DELETE_freq,
  GET_ALL_freq,
  GET_freq,
  POST_freq,
  PUT_freq,
  getCobrosFreq,
  setCobroFreqAmount,
} from '@controllers/frecuentes.controllers'
import { authUser } from '@middlewares/ErrorHandlers/Errors'
import { frecuentesRoutes } from '@utils/ROUTES'

const router = Router()

router
  .route(frecuentesRoutes.index)
  .get(authUser, GET_ALL_freq)
  .post(authUser, POST_freq)

router
  .route(frecuentesRoutes.id)
  .get(authUser, GET_freq)
  .put(authUser, PUT_freq)
  .delete(authUser, DELETE_freq)

router.get(frecuentesRoutes.getCobrosFreq, [authUser], getCobrosFreq)

router.put(frecuentesRoutes.setCobrosFreqMonto, [authUser], setCobroFreqAmount)

export default router
