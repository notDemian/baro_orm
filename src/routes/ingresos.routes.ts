import { Router } from 'express'

import { getIngresos, updateIngreso } from '@controllers/ingresos.controllers'
import { authUser } from '@middlewares/ErrorHandlers/Errors'
import { ingresosRoutes } from '@utils/ROUTES'

const router = Router()

router.get(ingresosRoutes.getIngresos, [authUser], getIngresos)
router.post(ingresosRoutes.updateIngreso, [authUser], updateIngreso)

export default router
