import { DataUser } from '@entitys/DataUser'
import { Semanas } from '@entitys/Semanas'
import { User } from '@entitys/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { SECRET } from '@config/config'
import { delFile } from '@utils/helpers'
import {
  HandleReqWithMulter,
  HandleRequest,
  queryFailedGuard,
} from '@utils/types/helpers'

export const _getAllUsers: HandleRequest = async (req, res) => {
  try {
    const users = await User.find({
      relations: {
        dataUser: true,
        semanas: {
          days: {
            diarios: true,
          },
        },
        frecuentes: true,
        ingresos: true,
      },
    })
    return res.send(users)
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Error interno ' })
  }
}

export const createUser: HandleReqWithMulter<{
  correo: string
  contrasena: string
  nombre: string
  contrasenaConfirmada: string
}> = async (req, res) => {
  try {
    const { correo, contrasena, nombre, contrasenaConfirmada } = req.body
    console.log('req.body ->', {
      correo,
      contrasena,
      nombre,
      contrasenaConfirmada,
    })

    if (!correo || !contrasena || !nombre || !contrasenaConfirmada) {
      return res.status(400).json({ message: 'Faltan datos' })
    }
    if (contrasena.length > 32 || correo.length < 8) {
      return res.status(400).json({ message: 'Datos inválidos' })
    }
    if (!correo.includes('@') || !correo.includes('.') || correo.length > 50) {
      return res.status(400).json({ message: 'Correo inválido' })
    }
    if (nombre.length > 70 || nombre.length < 3) {
      return res.status(400).json({ message: 'Nombre inválido' })
    }
    if (contrasena != contrasenaConfirmada) {
      return res
        .status(400)
        .json({ message: 'Las contrasenas deben coincidir' })
    }
    // if (!req.file) {
    //   return res.status(400).json({ message: 'No hay archivo' })
    // }
    // const { filename } = req.file
    const filename = 'default.png'

    const encryptedPassword = await bcrypt.hash(contrasena, 10)

    const dataUser = DataUser.create({
      datName: nombre,
      datPhoto: filename,
    })

    await dataUser.save()

    const user = User.create({
      usuEmail: correo,
      usuPassword: encryptedPassword,
      dataUser: dataUser,
    })

    await user.save()

    const token = jwt.sign({ ...user }, SECRET)

    const {usuPassword, ...userWithoutPassword} = user

    return res.send({ message: 'Usuario creado correctamente', user: userWithoutPassword, token })
  } catch (error) {
    console.log('error ->', error)
    if (queryFailedGuard(error)) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'El correo ya está en uso' })
      }
      return res.status(400).json({ message: 'Datos inválidos' })
    }

    return res.status(500).send({ message: 'Error interno ' })
  }
}

export const loginUser: HandleRequest<{
  correo: string
  contraseña: string
}> = async (req, res) => {
  try {
    const { correo, contraseña } = req.body

    if (!correo || !contraseña) {
      return res.status(400).json({ message: 'Faltan datos' })
    }
    if (contraseña.length > 32 || correo.length < 8) {
      return res.status(400).json({ message: 'Datos inválidos' })
    }
    if (!correo.includes('@') || !correo.includes('.') || correo.length > 50) {
      return res.status(400).json({ message: 'Correo inválido' })
    }

    const user = await User.findOne({
      where: { usuEmail: correo },
      relations: {
        dataUser: true,
      },
    })

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Correo o contraseña incorrectos' })
    }

    const match = await bcrypt.compare(contraseña, user.usuPassword)

    if (!match) {
      return res
        .status(400)
        .json({ message: 'Correo o contraseña incorrectos' })
    }

    const token = jwt.sign({ ...user }, SECRET)

    const {usuPassword, ...userWithoutPassword} = user

    return res.send({ message: 'Usuario logueado correctamente', user:userWithoutPassword, token })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Error interno ' })
  }
}

export const updatePhoto: HandleReqWithMulter = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No hay archivo' })
    }

    const { filename } = req.file
    const token = req.get('token')
    if (!token) {
      delFile(filename)
      return res.status(400).json({ message: 'No hay sesión iniciada' })
    }
    const decoded = jwt.verify(token, SECRET) as User

    if (!decoded.usuId) {
      delFile(filename)
      return res.status(400).json({ message: 'Sesión invalida' })
    }
    const userUpdated = await User.findOne({
      where: { usuId: decoded.usuId },
      relations: {
        dataUser: true,
      },
    })

    if (!userUpdated) {
      delFile(filename)
      return res.status(400).json({ message: 'Sesión invalida' })
    }

    delFile(userUpdated.dataUser.datPhoto)

    userUpdated.dataUser.datPhoto = filename

    await userUpdated.dataUser.save()

    return res.send({ message: 'Foto actualizada correctamente', filename })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Error interno ' })
  }
}

export const updateUser: HandleRequest<{
  name: string
  newPassword: string
  newPasswordConfirmed: string
  email?: string
}> = async (req, res) => {
  try {
    const { name, newPassword, newPasswordConfirmed, email } = req.body
    if (!name || !newPassword || !newPasswordConfirmed) {
      return res.status(400).json({ message: 'Faltan datos (name)' })
    }
    if (newPassword !== newPasswordConfirmed) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden' })
    }
    const token = req.get('token')
    if (!token) {
      return res.status(400).json({ message: 'No hay sesión iniciada' })
    }
    const decodedUser = jwt.verify(token, SECRET) as User
    if (!decodedUser.usuId) {
      return res.status(400).json({ message: 'Sesión invalida' })
    }
    console.log(decodedUser)

    const newPasswordHashed = await bcrypt.hash(newPassword, 10)

    const updated = await DataUser.update(
      {
        datId: decodedUser.dataUser.datId,
      },
      {
        datName: name,
      }
    )

    const updated2 = await User.update(
      {
        usuId: decodedUser.usuId,
      },
      {
        usuPassword: newPasswordHashed,
        ...(email ? { usuEmail: email } : {}),
      }
    )

    const newUser = await User.findOne({
      where: { usuId: decodedUser.usuId },
      relations: {
        dataUser: true,
      },
    })

    if (!newUser) {
      return res.status(400).json({ message: 'Sesión invalida' })
    }

    const { usuPassword: _, ...userWithoutPassword } = newUser

    return res.send({
      message: 'Usuario actualizado correctamente',
      user: userWithoutPassword,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Error interno' })
  }
}

export const logout: HandleRequest = async (req, res) => {
  try {
    if (!req.get('token')) {
      return res.status(400).json({ message: 'No hay sesión iniciada' })
    }
    res.clearCookie('token')
    return res.status(200).json({ message: 'Sesión cerrada' })
  } catch (e) {
    return res.status(400).json({ message: 'Error al cerrar sesión', e })
  }
}

export const cleanAccount: HandleRequest = async (req, res) => {
  try {
    const token = req.get('token')
    if (!token) {
      return res.status(400).json({ message: 'No hay sesión iniciada' })
    }
    const decoded = jwt.verify(token, SECRET) as User

    if (!decoded.usuId) {
      return res.status(400).json({ message: 'Sesión invalida' })
    }

    const semanas = await Semanas.find({
      where: { user: { usuId: decoded.usuId } },
    })

    if (!semanas) {
      return res.status(400).json({ message: 'Sesión invalida' })
    }

    await Semanas.remove(semanas)

    return res.status(200).json({ message: 'Cuenta vaciada' })
  } catch (e) {
    return res.status(400).json({ message: 'Error al vaciar la cuenta', e })
  }
}

export const deleteAccount: HandleRequest<{ password?: string }> = async (
  req,
  res
) => {
  try {
    const { password } = req.body
    console.log({ password })
    if (!password) {
      return res.status(400).json({ message: 'Faltan datos' })
    }
    const token = req.get('token')
    if (!token) {
      return res.status(400).json({ message: 'No hay sesión iniciada' })
    }
    const decoded = jwt.verify(token, SECRET) as User

    if (!decoded.usuId) {
      return res.status(400).json({ message: 'Sesión invalida' })
    }
    console.log({ usuId: decoded.usuId })

    const user = await DataUser.findOne({
      where: {
        user: {
          dataUser: {
            user: { usuId: decoded.usuId },
          },
        },
      },
      relations: {
        user: true,
      },
    })

    if (!user) {
      return res.status(400).json({ message: 'Sesión invalida' })
    }

    const match = await bcrypt.compare(password, user.user.usuPassword)

    if (!match) {
      return res.status(400).json({ message: 'Contraseña incorrecta' })
    }

    delFile(user.datPhoto || '')
    await user.remove()

    return res.status(200).json({ message: 'Cuenta eliminada' })
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: 'Error al eliminar la cuenta', e })
  }
}
