import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from 'typeorm'
import { User } from './User'
@Entity({
  name: 'data_usuario'
})
export class DataUser extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'datId',
    type: 'int'
  })
  datId: number

  @Column({
    name: 'datName',
    type: 'varchar',
    length: 50
  })
  datName!: string

  @Column({
    name: 'datPhoto',
    type: 'varchar',
    length: 50
  })
  datPhoto!: string

  @Column({
    name: 'datProfile',
    type: 'int',
    default: 0
  })
  datProfile: number

  @Column({
    name: 'datBalance',
    type: 'float',
    default: 0
  })
  datBalance: number

  @OneToOne(() => User, (user) => user.dataUser)
  user: User
}
