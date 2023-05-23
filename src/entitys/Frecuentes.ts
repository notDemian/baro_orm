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

/**
 * CREATE TABLE `frecuentes` (
  `freId` int NOT NULL AUTO_INCREMENT,
  `freName` varchar(50) NOT NULL,
  `freDescription` varchar(150) DEFAULT NULL,
  `freAmount` float NOT NULL,
  `freLapse` varchar(50) NOT NULL,
  `dayId` int NOT NULL,
  `usuId` int NOT NULL,
  PRIMARY KEY (`freId`),
  KEY `dayIdFre_idx` (`dayId`),
  CONSTRAINT `dayIdFre` FOREIGN KEY (`dayId`) REFERENCES `day` (`dayId`) ON DELETE CASCADE,
  KEY `usuId_idx` (`usuId`),
  CONSTRAINT `usuIdFre` FOREIGN KEY (`usuId`) REFERENCES `usuario` (`usuId`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
 */

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
    name: 'freLapse',
    type: 'varchar',
    length: 50
  })
  freLapse!: LAPSES

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
