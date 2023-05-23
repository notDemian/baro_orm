import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Frecuentes } from './Frecuentes'

@Entity({
  name: 'cobros_fre'
})
export class CobrosFreq extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'cobId',
    type: 'int'
  })
  cobId: number

  @Column({
    name: 'cobDate',
    type: 'varchar',
    length: 20
  })
  cobDate!: string

  @ManyToOne(() => Frecuentes, (freq) => freq.cobros)
  @JoinColumn()
  frecuente: Frecuentes
}
