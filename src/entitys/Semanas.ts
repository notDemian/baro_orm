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

@Entity({
  name: 'semanas'
})
export class Semanas extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'semId',
    type: 'int'
  })
  semId: number

  @Column({
    name: 'semStart',
    type: 'varchar',
    length: 20
  })
  semStart!: string

  @Column({
    name: 'semEnd',
    type: 'varchar',
    length: 20
  })
  semEnd!: string

  @ManyToOne(() => User, (user) => user.semanas, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'

  })
  @JoinColumn()
  user: User

  @OneToMany(() => Day, (day) => day.semana)
  days: Day[]
}
