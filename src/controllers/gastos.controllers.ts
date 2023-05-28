/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable indent */
import { DataUser } from '@entitys/DataUser'
import { Day } from '@entitys/Day'
import { Diarios } from '@entitys/Diarios'
import { Semanas } from '@entitys/Semanas'
import { User } from '@entitys/User'
import { getBalance } from '@services/user.services'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import moment from 'moment/moment.js'

import { API_IA_URL, SECRET } from '@config/config'
import { FORMATS, getSemEnd, getSemStart } from '@utils/Dates'
import { LIMITS } from '@utils/types/Day/controller'
import { GetClassificationResponse } from '@utils/types/IA'
import { HandleRequest } from '@utils/types/helpers'

export const createGastoDiario: HandleRequest<{
  nombre: string
  desc: string
  monto: string
  icono: number
}> = async (req, res) => {
  try {
    const { nombre, desc, monto, icono } = req.body
    moment.locale('es')
    const today = moment().format(FORMATS.SIMPLE_DATE)
    const semStart = moment().startOf('week').format(FORMATS.SIMPLE_DATE)
    const semEnd = moment().endOf('week').format(FORMATS.SIMPLE_DATE)

    if (!nombre || !desc || !monto || icono === null)
      return res.status(400).json({ message: 'Faltan datos' })

    const Amount = parseFloat(monto)
    if (isNaN(Amount) || Amount <= 0)
      return res.status(400).json({ message: 'Gasto invalido' })

    const rUser = res.locals.user
    if (!rUser) return res.status(400).json({ message: 'Sesión invalida' })

    const user = await User.findOneOrFail({
      where: {
        usuId: rUser.usuId,
      },
      relations: {
        dataUser: true,
      },
    })

    const ActualBalance = user.dataUser.datBalance
    const newBalance = ActualBalance - Amount

    if (ActualBalance < Amount) {
      return res.status(400).json({ message: 'No tienes suficiente dinero' })
    }

    let finalDay: Day

    const semanaFound = await Semanas.findOne({
      where: {
        semEnd,
        semStart,
        user: {
          usuId: rUser.usuId,
        },
      },
      relations: {
        days: true,
      },
    })

    if (!semanaFound) {
      const semanaCreated = Semanas.create({
        semEnd,
        semStart,
        user,
      })

      const semana = await semanaCreated.save()

      const dayCreated = Day.create({
        dayDate: today,
        semana: semana,
      })

      finalDay = await dayCreated.save()
    } else {
      const dayFound = semanaFound.days.find((day) => day.dayDate === today)

      if (!dayFound) {
        const dayCreated = Day.create({
          dayDate: today,
          semana: semanaFound,
        })

        finalDay = await dayCreated.save()
      } else {
        finalDay = dayFound
      }
    }
    const diario = Diarios.create({
      diaAmount: Amount,
      diaDescription: desc,
      diaIcon: icono,
      diaName: nombre,
      day: finalDay,
    })

    try {
      console.log({ API_IA_URL })
      const resIA = await axios.post<GetClassificationResponse>(
        `${API_IA_URL}/api/classification/dia`,
        diario,
        {
          timeout: 100_000,
        }
      )
      console.log({ data: resIA.data })
      if (resIA && resIA.data && resIA.data.classification)
        diario.diaCategory = resIA.data.classification
    } catch (err: any) {
      console.log({ error: err.response.data })
    }

    await diario.save()

    user.dataUser.datBalance = newBalance
    await user.dataUser.save()

    return res.status(200).json({ message: 'Gasto creado', newBalance })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Usuario no encontrado' })
  }
}

export const getGastos: HandleRequest = async (req, res) => {
  try {
    const rUser = res.locals.user
    if (!rUser) return res.status(400).json({ message: 'Sesión invalida' })

    // get last semana days
    const gastos = await Diarios.find({
      where: {
        day: {
          semana: {
            user: {
              usuId: rUser.usuId,
            },
          },
        },
      },
      relations: {
        day: true,
      },
      order: {
        diaId: 'DESC',
      },
      take: 10,
    })

    return res.status(200).json({ message: 'Gastos obtenidos', gastos })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const getSemanas: HandleRequest<{}, { semana?: string }> = async (
  req,
  res
) => {
  try {
    const { semana } = req.params
    moment.locale('es')
    const semStart = getSemStart().format(FORMATS.SIMPLE_DATE)
    const semEnd = getSemEnd().format(FORMATS.SIMPLE_DATE)
    const semanaStart = getSemStart(semana).format(FORMATS.SIMPLE_DATE)
    const semanaEnd = getSemEnd(semana).format(FORMATS.SIMPLE_DATE)
    const rUser = res.locals.user
    if (!rUser) return res.status(400).json({ message: 'Sesión invalida' })

    const semanaFound = await Semanas.findOne({
      where: {
        semStart: semana && semana !== '' ? semanaStart : semStart,
        user: {
          usuId: rUser.usuId,
        },
      },
      order: {
        semStart: 'DESC',
      },
      relations: {
        days: {
          diarios: true,
        },
      },
    })

    if (!semanaFound) {
      return res.status(400).json({ message: 'No hay semana' })
    }

    const dates: string[] = []

    const stadisticInfo: {
      avgWeek: number
      vsLastWeek: number
      biggestExpense: number
    } = {
      avgWeek: 0,
      vsLastWeek: 0,
      biggestExpense: 0,
    }

    const startDate = moment(semanaFound.semStart)
    const endDate = moment(semanaFound.semEnd)

    while (startDate.diff(endDate) <= 0) {
      dates.push(startDate.format(FORMATS.SIMPLE_DATE))
      startDate.add(1, 'days')
    }

    let nextWeek: string | null = null
    let prevWeek: string | null = null
    if (semana && semana !== '') {
      nextWeek = moment(semana)
        .endOf('week')
        .add(1, 'day')
        .format(FORMATS.SIMPLE_DATE)
      prevWeek = moment(semana)
        .startOf('week')
        .subtract(1, 'day')
        .format(FORMATS.SIMPLE_DATE)
    } else {
      nextWeek = getSemEnd().add(1, 'day').format(FORMATS.SIMPLE_DATE)
      prevWeek = getSemStart().subtract(1, 'day').format(FORMATS.SIMPLE_DATE)
    }

    const nextWeekFound = await Semanas.findOne({
      where: {
        semStart: nextWeek,
        user: {
          usuId: rUser.usuId,
        },
      },
      order: {
        semStart: 'DESC',
      },
    })

    const prevWeekFound = await Semanas.findOne({
      where: {
        semStart: prevWeek,
        user: {
          usuId: rUser.usuId,
        },
      },
      order: {
        semStart: 'DESC',
      },
    })

    nextWeek = nextWeekFound ? nextWeek : null
    prevWeek = prevWeekFound ? prevWeek : null

    let totalLastWeek = 0
    if (prevWeekFound) {
      const semId = prevWeekFound.semId
      const { sum } = await Diarios.createQueryBuilder('diarios')
        .select('SUM(diarios.diaAmount)', 'sum')
        .innerJoin('day', 'day')
        .where('day.semanaSemId = :semId', { semId })
        .getRawOne()

      console.log({
        sum,
        prevWeekFound,
      })
      totalLastWeek = sum
    }

    const finalDays: {
      dayId?: number
      dayDate: string
      dayTotal: number
    }[] = []

    for (const e of dates) {
      const diafiltered = semanaFound.days.find((day) => day.dayDate === e)

      if (!diafiltered) {
        finalDays.push({
          dayId: undefined,
          dayDate: e,
          dayTotal: 0,
        })
        continue
      }

      const { dayId, dayDate } = diafiltered

      const dayTotal =
        (
          await Diarios.createQueryBuilder('diarios')
            .select('SUM(diarios.diaAmount)', 'sum')
            .where('diarios.dayDayId = :dayId', { dayId })
            .getRawOne()
        ).sum ?? 0

      if (dayTotal > stadisticInfo.biggestExpense)
        stadisticInfo.biggestExpense = dayTotal

      finalDays.push({ dayId, dayDate, dayTotal })
    }

    const totalWeek = finalDays.reduce((acc, e) => {
      if (e) return acc + e.dayTotal
      return acc
    }, 0)

    stadisticInfo.avgWeek = totalWeek / finalDays.length

    stadisticInfo.vsLastWeek = totalLastWeek - totalWeek

    console.log({
      finalDays,
    })

    return res.status(200).json({
      message: 'semanas recuperadas exitosamente',
      finalDays,
      actualWeek:
        semana && semana !== ''
          ? `${semanaStart} / ${semanaEnd}`
          : `${semStart} / ${semEnd}`,
      nextWeek,
      prevWeek,
      stadisticInfo,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const getDay: HandleRequest<{}, { day?: string }> = async (req, res) => {
  try {
    const { day } = req.params

    const rUser = res.locals.user
    if (!rUser) return res.status(400).json({ message: 'Sesión invalida' })

    moment.locale('es')
    const Today = moment(day)
    if (!Today.isValid()) {
      return res.status(400).json({ message: 'Introduce una fecha válida' })
    }
    const FormatDay = Today.format(FORMATS.SIMPLE_DATE)
    const lastDay = Today.subtract(1, 'day').format(FORMATS.SIMPLE_DATE)
    const nextDay = Today.add(2, 'day').format(FORMATS.SIMPLE_DATE)

    const [dayFoundRes, lastDayFoundRes, nextDayFoundRes] =
      await Promise.allSettled([
        Day.findOne({
          where: {
            dayDate: FormatDay,
            semana: {
              user: {
                usuId: rUser.usuId,
              },
            },
          },
          relations: {
            diarios: true,
          },
        }),
        Day.findOne({
          where: {
            dayDate: lastDay,
            semana: {
              user: {
                usuId: rUser.usuId,
              },
            },
          },
          relations: {
            diarios: true,
          },
        }),
        Day.findOne({
          where: {
            dayDate: nextDay,
            semana: {
              user: {
                usuId: rUser.usuId,
              },
            },
          },
          relations: {
            diarios: true,
          },
        }),
      ])

    if (dayFoundRes.status === 'rejected' || !dayFoundRes.value) {
      return res.status(400).json({ message: 'Día no encontrado' })
    }

    const dayFound = dayFoundRes.value
    const lastDayFound =
      lastDayFoundRes.status === 'fulfilled' ? lastDayFoundRes.value : null
    const nextDayFound =
      nextDayFoundRes.status === 'fulfilled' ? nextDayFoundRes.value : null

    const days: { lastDay: null | string; nextDay: null | string } = {
      lastDay: null,
      nextDay: null,
    }

    const totalLastDay =
      lastDayFound?.diarios.reduce((acc, e) => {
        if (e) return acc + e.diaAmount
        return acc
      }, 0) ?? 0

    const totalToday = dayFound.diarios.reduce((acc, e) => {
      if (e) return acc + e.diaAmount
      return acc
    }, 0)

    let mostExpensiveCharge = 0
    dayFound.diarios.forEach((day) => {
      if (day.diaAmount > mostExpensiveCharge)
        mostExpensiveCharge = day.diaAmount
    })

    const diffDays = totalLastDay - totalToday
    const avgDay = !isNaN(totalToday / dayFound.diarios.length)
      ? totalToday / dayFound.diarios.length
      : 0

    const byAmount: [number, number, number, number, number] = [0, 0, 0, 0, 0]
    dayFound.diarios.forEach((day) => {
      const amount = day.diaAmount
      if (amount > 0 && amount <= LIMITS.LVL1) {
        byAmount[0]++
      } else if (amount <= LIMITS.LVL2) {
        byAmount[1]++
      } else if (amount <= LIMITS.LVL3) {
        byAmount[2]++
      } else if (amount <= LIMITS.LVL4) {
        byAmount[3]++
      } else {
        byAmount[4]++
      }
    })

    // first capital letter dayname
    const dayName = moment(FormatDay)
      .format('dddd')
      .replace(/^\w/, (c) => c.toUpperCase())

    return res.status(200).json({
      gastosDia: dayFound.diarios,
      avgDay,
      diffDays,
      mostExpensiveCharge,
      byAmount,
      days,
      dayName,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const updateGasto: HandleRequest<{
  newDescripcion: string
  newMonto: number
  newIcono: number
  newNombre: string
  id: number
}> = async (req, res) => {
  const { newDescripcion, newMonto, newIcono, newNombre, id } = req.body
  if (
    !newDescripcion ||
    newMonto === undefined ||
    newIcono === undefined ||
    !newNombre ||
    !id
  )
    return res.status(400).json({ message: 'Faltan datos' })
  if (newMonto <= 0) return res.status(400).json({ message: 'Monto invalido' })

  try {
    const rUser = res.locals.user
    if (!rUser) return res.status(400).json({ message: 'Sesión invalida' })
    const [datBalance, err] = await getBalance(rUser.usuId)
    if (datBalance === undefined)
      return res.status(400).json({ message: 'Usuario no encontrado' })

    const diarioFound = await Diarios.findOne({
      where: {
        diaId: id,
      },
    })
    if (!diarioFound) return res.status(400).json({ message: 'No hay gasto' })

    const diaAmount = diarioFound.diaAmount

    const delta = diaAmount - newMonto

    const newBalance = datBalance + delta
    if (newBalance < 0)
      return res
        .status(400)
        .json({ message: 'No puedes introducir esa cantidad' })

    const updatedDiario = await Diarios.update(
      { diaId: id },
      {
        diaDescription: newDescripcion,
        diaAmount: newMonto,
        diaIcon: newIcono,
        diaName: newNombre,
      }
    )

    if (!updatedDiario.affected)
      return res.status(400).json({ message: 'No se pudo actualizar el gasto' })

    const updatedBalance = await DataUser.update(
      {
        datId: rUser.dataUser.datId,
      },
      {
        datBalance: newBalance,
      }
    )

    if (!updatedBalance.affected)
      return res
        .status(400)
        .json({ message: 'No se pudo actualizar el balance' })

    return res.status(200).json({ message: 'Gasto actualizado', newBalance })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error en el servidor' })
  }
}
