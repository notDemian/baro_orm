import { Router } from 'express'

import { getIngresos, updateIngreso } from '@controllers/ingresos.controllers'
import { authUser } from '@middlewares/ErrorHandlers/Errors'

const router = Router()

router.get('/getIngresos', [authUser], getIngresos)
router.post('/updateIngreso', [authUser], updateIngreso)

export default router
