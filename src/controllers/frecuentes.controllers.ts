/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-empty-function */
import { CobrosFreq } from '@entitys/CobrosFreq'
import { Day } from '@entitys/Day'
import { Frecuentes } from '@entitys/Frecuentes'
import { Notification } from '@entitys/Notification'
import { Semanas } from '@entitys/Semanas'
import { User } from '@entitys/User'
import axios from 'axios'
import jwt from 'jsonwebtoken'

/* eslint-disable indent */
import moment, { Moment } from 'moment/moment.js'
import type { OkPacket, RowDataPacket } from 'mysql2'

import { Frecuente } from '../utils/types/Frecuentes/controller'

import { API_IA_URL, SECRET } from '@config/config'
import { FORMATS, getSemStart } from '@utils/Dates'
import { isNumber } from '@utils/Numbers'
import { getFreqNotification, getPriorityColor } from '@utils/helpers'
import { DayRow } from '@utils/types/Day/controller'
import {
  COLORS_FREQ,
  GastoFrecuente,
  LAPSES_TO_INT,
} from '@utils/types/Frecuentes/controller'
import { GetClassificationResponse } from '@utils/types/IA'
import { SemanasRow } from '@utils/types/Semanas/controller'
import { HandleRequest } from '@utils/types/helpers'

export const POST_freq: HandleRequest<GastoFrecuente> = async (req, res) => {
  try {
    const rUser = res.locals.user
    if (!rUser) return res.status(400).json({ message: 'Sesión invalida' })

    const { name, amount, lapse, description, isStatic, date } = req.body
    if (
      !name ||
      !amount ||
      !lapse ||
      !description ||
      isStatic === undefined ||
      name.trim() === '' ||
      amount <= 0 ||
      lapse.trim() === ''
    ) {
      return res.status(400).json({ message: 'Datos incompletos' })
    }

    const Today = moment()
    if (!Today.isValid()) {
      return res.status(400).json({ message: 'Fecha no válida' })
    }
    const today = Today.format(FORMATS.SIMPLE_DATE)
    const startOfWeek = getSemStart().format(FORMATS.SIMPLE_DATE)

    const dayFound = await Day.findOne({
      relations: { semana: true },
      where: { dayDate: today, semana: { user: { usuId: rUser.usuId } } },
    })

    let todayEntity: Day | null = dayFound

    if (!dayFound) {
      const semanaFound = await Semanas.findOne({
        relations: { user: true },
        where: { semStart: startOfWeek, user: { usuId: rUser.usuId } },
      })

      if (!semanaFound) {
        const endOfWeek = Today.endOf('week').format(FORMATS.SIMPLE_DATE)
        const semanaCreated = Semanas.create({
          semStart: startOfWeek,
          semEnd: endOfWeek,
          user: { usuId: rUser.usuId },
        })

        const insertSemanas = await semanaCreated.save()

        const dayCreated = Day.create({
          dayDate: today,
          semana: insertSemanas,
        })

        todayEntity = await dayCreated.save()
      } else {
        const dayCreated = Day.create({
          dayDate: today,
          semana: semanaFound,
        })

        todayEntity = await dayCreated.save()
      }
    } else {
      todayEntity = dayFound
    }

    const freqCreated = Frecuentes.create({
      freName: name,
      freDescription: description,
      freAmount: amount,
      freLapse: lapse,
      freIsStatic: isStatic,
      day: todayEntity,
      user: { usuId: rUser.usuId },
    })

    try {
      const resIA = await axios.post<GetClassificationResponse>(
        `${API_IA_URL}/api/classification/freq`,
        freqCreated
      )
      if (resIA && resIA.data && resIA.data.classification)
        freqCreated.freCategory = resIA.data.classification
    } catch (error) {
      console.log(error)
    }

    const insertFreq = await freqCreated.save()

    const firstCobDate = date

    const cobroCreated = CobrosFreq.create({
      cobDate: firstCobDate,
      frecuente: insertFreq,
    })

    const insertCobro = await cobroCreated.save()

    return res.status(201).json({
      message: 'Gasto creado',
      gasto: insertFreq,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error al crear el gasto' })
  }
}

export const GET_ALL_freq: HandleRequest = async (req, res) => {
  try {
    const rUser = res.locals.user
    if (!rUser) return res.status(400).json({ message: 'Sesión invalida' })

    const frecuentesFound = await Frecuentes.find({
      relations: { day: true, cobros: true },
      where: { user: { usuId: rUser.usuId } },
    })

    const Day = moment()

    type TypeTemp = Partial<Frecuentes> & {
      nextCobDate: string
      daysTillNextCob: number
      priorityColor: COLORS_FREQ
    }
    const proximos: TypeTemp[] = []

    const notifications: string[] = []

    for (const freq of frecuentesFound) {
      const cobroFound = freq.cobros.sort(
        (a, b) => moment(b.cobDate).unix() - moment(a.cobDate).unix()
      )[0]

      const nextCob = moment(cobroFound.cobDate)
      const daysTillNextCob = nextCob.diff(Day, 'days') + 1

      /* if (daysTillNextCob <= 0) {
        const cobroCreated = CobrosFreq.create({
          cobDate: nextCob.format(FORMATS.SIMPLE_DATE),
          frecuente: { freId: freq.freId },
        })


        const cobroSaved = await cobroCreated.save()

        const noti = getFreqNotification(freq.freName, freq.freAmount)

        const notiCreated = Notification.create({
          notContent: noti,
        })

        const notiSaved = await notiCreated.save()

        notifications.push(noti)
      } */

      const nextCobDate = nextCob.format(FORMATS.SIMPLE_DATE)

      const priorityColor = getPriorityColor(daysTillNextCob)

      proximos.push({
        ...freq,
        nextCobDate,
        daysTillNextCob,
        priorityColor,
      })
    }

    return res.status(200).json({
      message: 'Gastos frecuentes',
      frecuentes: frecuentesFound,
      proximos,
      notifications,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error al obtener los gastos' })
  }
}

export const GET_freq: HandleRequest<{}, { id?: string }> = async (
  req,
  res
) => {
  try {
    const { id } = req.params
    if (!id || !isNumber(id)) {
      return res.status(400).json({ message: 'Id no válido' })
    }

    const rUser = res.locals.user
    if (!rUser) return res.status(400).json({ message: 'Sesión invalida' })

    const freqFound = await Frecuentes.findOne({
      relations: { day: true },
      where: { freId: id, user: { usuId: rUser.usuId } },
    })

    if (!freqFound) {
      return res.status(404).json({ message: 'Gasto frecuente no encontrado' })
    }

    return res
      .status(200)
      .json({ message: 'Gasto frecuente', gasto: freqFound })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error al obtener el gasto' })
  }
}

export const PUT_freq: HandleRequest<
  Partial<GastoFrecuente>,
  { id?: unknown }
> = async (req, res) => {
  try {
    const { id } = req.params
    if (!id || !isNumber(id)) {
      return res.status(400).json({ message: 'Id no válido' })
    }

    const { name, amount, lapse, description } = req.body
    if (
      !name &&
      !amount &&
      // !date &&
      !lapse
    ) {
      return res.status(400).json({ message: 'Sin datos' })
    }

    if (amount && !isNumber(amount))
      return res.status(400).json({ message: 'El monto debe ser un número' })

    if (lapse && lapse.trim() === '')
      return res.status(400).json({ message: 'El lapso no debe estar vacío' })

    if (name && name.trim() === '')
      return res.status(400).json({ message: 'El nombre no debe estar vacío' })

    const rUser = res.locals.user
    if (!rUser) return res.status(400).json({ message: 'Sesión invalida' })

    const freqFound = await Frecuentes.findOne({
      where: { freId: id, user: { usuId: rUser.usuId } },
      relations: { day: true },
    })

    if (!freqFound) {
      return res.status(404).json({ message: 'Gasto frecuente no encontrado' })
    }

    if (name) {
      freqFound.freName = name
    }
    if (amount) {
      freqFound.freAmount = amount
    }
    if (lapse) {
      freqFound.freLapse = lapse
    }
    if (description) {
      freqFound.freDescription = description
    }

    const freqEdited = await freqFound.save()

    return res
      .status(200)
      .json({ message: 'Gasto frecuente', gasto: freqEdited })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error al obtener el gasto' })
  }
}

export const DELETE_freq: HandleRequest<{}, { id?: unknown }> = async (
  req,
  res
) => {
  try {
    const { id } = req.params
    if (!id || !isNumber(id)) {
      return res.status(400).json({ message: 'Id no válido' })
    }

    const rUser = res.locals.user
    if (!rUser) return res.status(400).json({ message: 'Sesión invalida' })

    const removedFreq = await Frecuentes.createQueryBuilder('frecuentes')
      .delete()
      .from(Frecuentes)
      .where('freId = :id', { id })
      .execute()

    if (removedFreq.affected === 0) {
      return res.status(400).json({ message: 'Gasto no encontrado' })
    }

    return res
      .status(200)
      .json({ message: 'Gasto frecuente eliminado', ok: true })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error al eliminar el gasto' })
  }
}

export const getCobrosFreq: HandleRequest<undefined, { id?: unknown }> = async (
  req,
  res
) => {
  try {
    const { id } = req.params
    if (!id || !isNumber(id)) {
      return res.status(400).json({ message: 'Id no válido' })
    }

    const rUser = res.locals.user
    if (!rUser) return res.status(400).json({ message: 'Sesión invalida' })

    const freqFound = await Frecuentes.findOne({
      relations: { cobros: true },
      where: { freId: id, user: { usuId: rUser.usuId } },
    })

    if (!freqFound) {
      return res.status(404).json({ message: 'Gasto frecuente no encontrado' })
    }

    freqFound.cobros = freqFound.cobros.sort((a, b) => {
      return moment(a.cobDate).unix() - moment(b.cobDate).unix()
    })
    // delete last cobro
    freqFound.cobros.pop()

    return res
      .status(200)
      .json({ message: 'Cobros obtenidos', freq: freqFound })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error al obtener los cobros' })
  }
}

export const setCobroFreqAmount: HandleRequest<
  { monto: number },
  { id?: unknown }
> = async (req, res) => {
  try {
    const { id } = req.params
    const { monto } = req.body
    if (!id || !isNumber(id)) {
      return res.status(400).json({ message: 'Id no válido' })
    }
    if (!monto || !isNumber(monto)) {
      return res.status(400).json({ message: 'Monto no válido' })
    }

    const rUser = res.locals.user
    if (!rUser) return res.status(400).json({ message: 'Sesión invalida' })

    const cobroFound = await CobrosFreq.findOne({
      where: { cobId: id },
    })

    if (!cobroFound) {
      return res.status(404).json({ message: 'Cobro no encontrado' })
    }

    const cobMoment = moment(cobroFound.cobDate)
    // no se puede modificar un cobro que ya paso
    if (cobMoment.isBefore(moment())) {
      return res.status(400).json({ message: 'Cobro ya pasado' })
    }

    cobroFound.cobAmount = monto

    const cobro = await cobroFound.save()

    return res.status(200).json({ message: 'Cobro agregado', cobro })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error al obtener los cobros' })
  }
}
