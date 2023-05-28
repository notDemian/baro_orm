import { Router } from 'express'

import {
  DELETE_freq,
  GET_ALL_freq,
  GET_freq,
  POST_freq,
  PUT_freq,
  getCobrosFreq,
} from '@controllers/frecuentes.controllers'
import { authUser } from '@middlewares/ErrorHandlers/Errors'

const router = Router()

router.route('/').get(authUser, GET_ALL_freq).post(authUser, POST_freq)

router
  .route('/:id')
  .get(authUser, GET_freq)
  .put(authUser, PUT_freq)
  .delete(authUser, DELETE_freq)

router.get('/getCobrosFreq/:id', [authUser], getCobrosFreq)

export default router
