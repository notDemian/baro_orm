import { Diarios } from '@entitys/Diarios'
import { Frecuentes } from '@entitys/Frecuentes'

import { HandleRequest } from '@utils/types/helpers'

export const IA_GET_ALL_FREQ: HandleRequest = async (req, res) => {
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
export const IA_GET_ALL_DIARIOS: HandleRequest = async (req, res) => {
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
