import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import { Day } from './Day'

@Entity({
  name: 'diarios'
})
export class Diarios extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'diaId',
    type: 'int'
  })
  diaId: number

  @Column({
    name: 'diaName',
    type: 'varchar',
    length: 50
  })
  diaName!: string

  @Column({
    name: 'diaDescription',
    type: 'varchar',
    length: 150
  })
  diaDescription!: string

  @Column({
    name: 'diaAmount',
    type: 'float'
  })
  diaAmount!: number

  @Column({
    name: 'diaIcon',
    type: 'int'
  })
  diaIcon!: number

  @Column({
    name: 'diaCategory',
    type: 'varchar',
    length: 63,
    nullable: true,
    default: null
  })
  diaCategory!: string

  @ManyToOne(() => Day, (day) => day.diarios, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  day: Day
}
