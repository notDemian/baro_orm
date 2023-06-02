import { unlink } from 'fs'
import numeral from 'numeral'
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

export function simpleFormat(
  number: number,
  opt?: {
    format?: string
  }
) {
  const num = numeral(number)
  const format = opt?.format ?? '0,0.00'
  return num.format(format)
}

export function getFreqNotification(
  freName: string,
  freAmount: number
): string {
  return `Se ha cobrado ${freName} por $${simpleFormat(freAmount)}`
}
