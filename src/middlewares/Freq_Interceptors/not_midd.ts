import { Notification } from '@entitys/Notification'
import jwt from 'jsonwebtoken'

import { SECRET } from '@config/config'
import { STATUS_FRECUENTE } from '@utils/types/Frecuentes/controller'
import { HandleRequest } from '@utils/types/helpers'
import { z_UserToken } from '@utils/zod'

export const not_midd_exp: HandleRequest = async (req, res, next) => {
  try {
    const token = req.get('token')
    if (!token || token === '') return next()

    const jwt_ = z_UserToken.safeParse(jwt.verify(token, SECRET))

    if (!jwt_.success) return next()

    const rUser = jwt_.data

    if (!rUser) return next()

    const not = await Notification.find({
      where: {
        user: {
          usuId: rUser.usuId,
        },
        notStatus: STATUS_FRECUENTE.NO_LEIDO,
      },
    })

    const oldJson = res.json
    res.json = function (body: any) {
      const newBody = {
        ...body,
        example_user1: 'example_user1',
        $notifications_user: not,
      }
      return oldJson.call(this, newBody)
    }
    next()
  } catch (error) {
    console.log({ error })
    next()
  }
}
