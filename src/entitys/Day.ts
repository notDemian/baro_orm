import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm'
import { Semanas } from './Semanas'
import { Diarios } from './Diarios'
import { Frecuentes } from './Frecuentes'

@Entity({
  name: 'day'
})
export class Day extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'dayId',
    type: 'int'
  })
  dayId: number

  @Column({
    name: 'dayDate',
    type: 'varchar',
    length: 20
  })
  dayDate!: string

  @ManyToOne(() => Semanas, (semana) => semana.days, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  semana: Semanas

  @OneToMany(() => Diarios, (diario) => diario.day)
  diarios: Diarios[]

  @OneToMany(() => Frecuentes, (freq) => freq.day)
  frecuentes: Frecuentes[]
}
