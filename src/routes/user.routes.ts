import { Router } from 'express'

import {
  _getAllUsers,
  cleanAccount,
  createUser,
  deleteAccount,
  loginUser,
  logout,
  setProfile,
  updatePhoto,
  updateUser,
} from '@controllers/user.controllers'
import { authUser } from '@middlewares/ErrorHandlers/Errors'
import multer from '@middlewares/multer'
import { userRoutes } from '@utils/ROUTES'
import { HandleRequest } from '@utils/types/helpers'

const router = Router()

router.get(userRoutes.index, _getAllUsers)
router.post(userRoutes.index, multer('pfp'), createUser as HandleRequest)
router.post(userRoutes.getUser, loginUser)

router.put(userRoutes.updateUser, [authUser], updateUser)

router.post(
  userRoutes.updatePhoto,
  [authUser],
  multer('pfp'),
  updatePhoto as HandleRequest
)

router.get(userRoutes.logout, logout)

router.post(userRoutes.deleteAccount, [authUser], deleteAccount)
router.get(userRoutes.cleanAccount, [authUser], cleanAccount)

router.post(userRoutes.setProfile, [authUser], setProfile)

export default router
