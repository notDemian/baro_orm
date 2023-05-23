// 'Salario' | 'Honorario' | 'Pensión' | 'Mesada'
export const INGRESOS = {
  SALARIO: 'Salario',
  HONORARIO: 'Honorario',
  PENSION: 'Pensión',
} as const

export type Ingreso = (typeof INGRESOS)[keyof typeof INGRESOS]

export type UpdateIngresoBody = {
  ingreso: string
  tipo: Ingreso
  desc: string
}
