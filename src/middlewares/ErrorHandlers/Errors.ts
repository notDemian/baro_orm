import jwt from 'jsonwebtoken'

import { HandleRequest } from '../../utils/types/helpers'

import { SECRET } from '@config/config'
import { delFile } from '@utils/helpers'
import { z_UserToken } from '@utils/zod'

export const authUser: HandleRequest = (req, res, next) => {
  const filename = req.file?.filename
  try {
    const token = req.get('token')
    if (!token || token === '') {
      filename && delFile(filename)
      return res.status(401).json({ message: 'Token de acceso no válido' })
    }
    const jwt_: unknown = jwt.verify(token, SECRET)
    const decodedUser = z_UserToken.safeParse(jwt_)

    if (!decodedUser.success) {
      filename && delFile(filename)
      return res.status(401).json({ message: 'Token de acceso no válido' })
    }

    res.locals.user = decodedUser.data

    next()
  } catch (err) {
    console.log(err)
    filename && delFile(filename)
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Token de acceso no válido' })
    }
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token de acceso expirado' })
    }
    return res.status(401).json({ message: 'Usuario no autorizado' })
  }
}
