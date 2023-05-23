import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { User } from './User'
import { Ingreso } from '@utils/types/Ingresos'

@Entity({
  name: 'ingresos'
})
export class Ingresos extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'ingId',
    type: 'int'
  })
  ingId: number

  @Column({
    name: 'ingDate',
    type: 'varchar',
    length: 50
  })
  ingDate!: string

  @Column({
    name: 'ingType',
    type: 'varchar',
    length: 150
  })
  ingType!: Ingreso

  @Column({
    name: 'ingAmount',
    type: 'float'
  })
  ingAmount!: number

  @Column({
    name: 'ingDescription',
    type: 'varchar',
    length: 150
  })
  ingDescription!: string

  @ManyToOne(() => User,(user) => user.ingresos, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'

  })
  @JoinColumn()
  user: User
}
