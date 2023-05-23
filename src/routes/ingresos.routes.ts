import { Router } from 'express'

import { getIngresos, updateIngreso } from '@controllers/ingresos.controllers'
import { HandleRequest } from '@utils/types/helpers'

const router = Router()

router.get('/getIngresos', getIngresos)
router.post('/updateIngreso', updateIngreso)

export default router
