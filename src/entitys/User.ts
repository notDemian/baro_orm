import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Semanas } from './Semanas'
import { Frecuentes } from './Frecuentes'
import { Ingresos } from './Ingresos'
import { DataUser } from './DataUser'

@Entity({
  name: 'usuario'
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'usuId',
    type: 'int'
  })
  usuId: number

  @Column({
    name: 'usuEmail',
    type: 'varchar',
    length: 50,
    unique: true
  })
  usuEmail!: string

  @Column({
    name: 'usuPassword',
    type: 'varchar',
    length: 300
  })
  usuPassword!: string

  @OneToOne(() => DataUser, (dat) => dat.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  dataUser!: DataUser

  @OneToMany(() => Semanas, (sem) => sem.user)
  semanas: Semanas[]

  @OneToMany(() => Frecuentes, (freq) => freq.user)
  frecuentes: Frecuentes[]



  @OneToMany(() => Ingresos, (ing) => ing.user)
  ingresos: Ingresos[]
}
