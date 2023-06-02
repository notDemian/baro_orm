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

  @Column({
    name: 'cobAmount',
    type: 'float',
    nullable: true,
    default: null
  })
  cobAmount: number | null

  @ManyToOne(() => Frecuentes, (freq) => freq.cobros, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'

  })
  @JoinColumn()
  frecuente: Frecuentes
}
