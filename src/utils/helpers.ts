import { unlink } from 'fs'
import { join } from 'path'

import type { COLORS_FREQ } from './types/Frecuentes/controller'

export const LIMITS = {
  LIGHT: 2,
  MEDIUM: 7,
  HARD: 90,
}

export const getPriorityColor = (daysTillNextCob: number): COLORS_FREQ => {
  if (daysTillNextCob <= LIMITS.LIGHT) {
    return 'Light'
  } else if (daysTillNextCob <= LIMITS.MEDIUM) {
    return 'Medium'
  } else {
    return 'Light'
  }
}

export async function delFile(file: string) {
  const dir = join(__dirname, `../public/${file}`)
  unlink(dir, (err) => {
    if (err) console.log(err)
  })
}
