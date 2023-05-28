import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm'
import { User } from './User'
import { Day } from './Day'
import { CobrosFreq } from './CobrosFreq'
import { LAPSES } from '@utils/types/Frecuentes/controller'


@Entity({
  name: 'frecuentes'
})
export class Frecuentes extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'freId',
    type: 'int'
  })
  freId: number

  @Column({
    name: 'freName',
    type: 'varchar',
    length: 50
  })
  freName!: string

  @Column({
    name: 'freDescription',
    type: 'varchar',
    length: 150,
    nullable: true,
    default: null
  })
  freDescription: string

  @Column({
    name: 'freAmount',
    type: 'float'
  })
  freAmount!: number
  
  @Column({
    name: 'freCategory',
    type: 'varchar',
    length: 63,
    nullable: true,
    default: null
  })
  freCategory!: string

  @Column({
    name: 'freLapse',
    type: 'varchar',
    length: 50
  })
  freLapse!: LAPSES

  @Column({
    name: 'freIsStatic',
    type: 'boolean',
    default: true,
  })
  freIsStatic!: boolean

  @ManyToOne(() => Day, (day) => day.frecuentes, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  day: Day

  @ManyToOne(() => User,(user) => user.frecuentes, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  user: User

  @OneToMany(() => CobrosFreq, (cobros) => cobros.frecuente, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  cobros: CobrosFreq[]
}
