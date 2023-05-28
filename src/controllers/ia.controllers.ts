import { Diarios } from '@entitys/Diarios'
import { Frecuentes } from '@entitys/Frecuentes'
import { Semanas } from '@entitys/Semanas'
import { User } from '@entitys/User'
import jwt from 'jsonwebtoken'

import { SECRET } from '@config/config'
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
