import { Router } from 'express'

import {
  _getAllUsers,
  cleanAccount,
  createUser,
  deleteAccount,
  loginUser,
  logout,
  updatePhoto,
  updateUser,
} from '@controllers/user.controllers'
import { authUser } from '@middlewares/ErrorHandlers/Errors'
import multer from '@middlewares/multer'
import { HandleRequest } from '@utils/types/helpers'

const router = Router()

router.get('/', _getAllUsers)
router.post('/', multer('pfp'), createUser as HandleRequest)
router.post('/getUser', loginUser)

router.put('/updateUser', [authUser], updateUser)

router.post(
  '/updatePhoto',
  [authUser],
  multer('pfp'),
  updatePhoto as HandleRequest
)

router.get('/logout', logout)

router.post('/deleteAccount', [authUser], deleteAccount)
router.get('/cleanAccount', [authUser], cleanAccount)

export default router
