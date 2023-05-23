import { Router } from 'express'

import {
  DELETE_freq,
  GET_ALL_freq,
  GET_freq,
  POST_freq,
  PUT_freq,
} from '@controllers/frecuentes.controllers'

const router = Router()

router.route('/').get(GET_ALL_freq).post(POST_freq)

router.route('/:id').get(GET_freq).put(PUT_freq).delete(DELETE_freq)

export default router
