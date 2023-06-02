import { CobrosFreq } from '@entitys/CobrosFreq'
import { Frecuentes } from '@entitys/Frecuentes'
import { Notification } from '@entitys/Notification'
import jwt from 'jsonwebtoken'
import moment from 'moment'

import { SECRET } from '@config/config'
import { FORMATS } from '@utils/Dates'
import ROUTES from '@utils/ROUTES'
import { delFile, getFreqNotification } from '@utils/helpers'
import {
  LAPSES_TO_INT,
  STATUS_FRECUENTE,
} from '@utils/types/Frecuentes/controller'
import { HandleRequest } from '@utils/types/helpers'
import { UserToken } from '@utils/zod'
import { z_UserToken } from '@utils/zod'

export const listenFreq: HandleRequest = async (req, res, next) => {
  const originalUrl = req.originalUrl

  const ignored_urls: string[] = [`${ROUTES.main.users}`, `.jpg`, `.png`]

  if (ignored_urls.some((ignor_url) => originalUrl.includes(ignor_url)))
    return next()

  const token = req.get('token')
  if (!token || token === '') return next()

  const jwt_ = z_UserToken.safeParse(jwt.verify(token, SECRET))
  if (!jwt_.success) return next()

  const rUser = jwt_.data

  const FrecuentesFound = await Frecuentes.find({
    where: {
      user: {
        usuId: rUser.usuId,
      },
    },
    relations: {
      cobros: true,
      day: true,
      user: {
        dataUser: true,
      },
    },
  })

  const Today = moment()

  console.log({
    Today: Today.format(FORMATS.SIMPLE_DATE),
    FrecuentesFound,
  })

  for (const frecuente of FrecuentesFound) {
    const lastCobro = frecuente.cobros[frecuente.cobros.length - 1]

    console.log({
      lastCobro,
    })

    if (!lastCobro) continue

    const lastCobroDate = moment(lastCobro.cobDate)

    console.log({
      lastCobroDate: lastCobroDate.format(FORMATS.SIMPLE_DATE),
    })

    const daysTillCobro = lastCobroDate.diff(Today, 'days')

    console.log({
      daysTillCobro,
    })

    if (daysTillCobro > 0) continue

    const amount = lastCobro.cobAmount ?? frecuente.freAmount

    frecuente.user.dataUser.datBalance =
      frecuente.user.dataUser.datBalance - amount

    await frecuente.user.dataUser.save()

    const nextCobDate = LAPSES_TO_INT[frecuente.freLapse]?.(lastCobroDate)

    const cobroCreated = CobrosFreq.create({
      cobDate: nextCobDate.format(FORMATS.SIMPLE_DATE),
      frecuente,
    })

    const not = Notification.create({
      notContent: getFreqNotification(frecuente.freName, amount),
      notStatus: STATUS_FRECUENTE.NO_LEIDO,
      user: frecuente.user,
    })

    const cobroSaved = await cobroCreated.save()

    const notSaved = await not.save()
  }

  next()
}
