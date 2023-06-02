import { Diarios } from '@entitys/Diarios'
import { Frecuentes } from '@entitys/Frecuentes'
import { Semanas } from '@entitys/Semanas'
import { User } from '@entitys/User'
import axios from 'axios'
import jwt from 'jsonwebtoken'

import { API_IA_URL, SECRET } from '@config/config'
import { GetPredictionsResponse } from '@utils/types/IA'
import { HandleRequest } from '@utils/types/helpers'

export const IA_GET_ALL_FREQ: HandleRequest<unknown, unknown> = async (
  req,
  res
) => {
  try {
    const ALL_FRECUENTES = await Frecuentes.find()

    return res
      .status(200)
      .json({ message: 'Gastos frecuentes', data: ALL_FRECUENTES })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error en el servidor' })
  }
}
export const IA_GET_ALL_DIARIOS: HandleRequest<unknown, unknown> = async (
  req,
  res
) => {
  try {
    const ALL_DIARIOS = await Diarios.find()

    return res
      .status(200)
      .json({ message: 'Gastos frecuentes', data: ALL_DIARIOS })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const test: HandleRequest<unknown, unknown> = async (req, res) => {
  return res.status(200).json({ message: 'HOLA MANU', data: req.body })
}

export const GET_CLASSIFICATIONS_IA: HandleRequest = async (req, res) => {
  try {
    if (!res.locals.user)
      return res.status(400).json({ message: 'No se encontró el usuario' })
    const semanasFound = await Semanas.find({
      where: {
        user: {
          usuId: res.locals.user.usuId,
        },
      },
      relations: {
        days: {
          diarios: true,
          frecuentes: true,
        },
      },
    })

    return res
      .status(200)
      .json({ message: 'Gastos frecuentes', data: semanasFound })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const GET_PREDICTIONS_IA: HandleRequest = async (req, res) => {
  try {
    const rUser = res.locals.user
    if (!rUser)
      return res.status(400).json({ message: 'No se encontró el usuario' })

    const gastos: number[] = []
    const semanasFound = await Semanas.find({
      where: {
        user: {
          usuId: rUser.usuId,
        },
      },
      relations: {
        days: {
          diarios: true,
          frecuentes: {
            cobros: true,
          },
        },
      },
    })

    semanasFound.forEach((semana) => {
      semana.days.forEach((dia) => {
        dia.diarios.forEach((diario) => {
          gastos.push(diario.diaAmount)
        })
        dia.frecuentes.forEach((frecuente) => {
          frecuente.cobros.forEach((cobro) => {
            cobro.cobAmount && gastos.push(cobro.cobAmount)
          })
        })
      })
    })

    /* if (gastos.length <= 100)
      return res.status(200).json({
        message: 'No hay gastos suficientes para la predicción',
        showPredictions: false,
      }) */

    const data = {
      gastos,
    }

    const resIA = await axios.post<GetPredictionsResponse>(
      `${API_IA_URL}/api/predictions`,
      data,
      {
        timeout: 20_000,
      }
    )

    if (!resIA.data || !resIA.data.prediction)
      return res
        .status(500)
        .json({ message: 'Error en el servidor', showPredictions: false })

    return res.status(200).json({
      message: 'Predicciones',
      data: resIA.data.prediction,
      showPredictions: true,
    })
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Error en el servidor XD', err, showPredictions: false })
  }
}
