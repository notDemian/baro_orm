import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from 'typeorm'
import { User } from './User'
import { STATUS_FRECUENTE, STATUS_FRECUENTE_TYPE } from '@utils/types/Frecuentes/controller'
@Entity({
  name: 'notification'
})
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'notId',
    type: 'int'
  })
  notId: number

  @Column({
    name: 'notContent',
    type: 'varchar',
    length: 255
  })
  notContent!: string

  @Column({
    name: 'notStatus',
    type: 'varchar',
    length: 255,
    default: STATUS_FRECUENTE.NO_LEIDO,
    
  })
  notStatus!: STATUS_FRECUENTE_TYPE

  @ManyToOne(() => User, (user) => user.notifications, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  user: User
}
