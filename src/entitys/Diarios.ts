import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import { Day } from './Day'
/**
 * CREATE TABLE `diarios` (
  `diaId` int NOT NULL AUTO_INCREMENT,
  `diaName` varchar(50) NOT NULL,
  `diaDescription` varchar(150) DEFAULT NULL,
  `diaAmount` float NOT NULL,
  `diaIcon` int NOT NULL,
  `diaCategory` varchar(63) DEFAULT NULL,
  `dayId` int NOT NULL,
  PRIMARY KEY (`diaId`),
  KEY `dayIdDia_idx` (`dayId`),
  CONSTRAINT `dayIdDia` FOREIGN KEY (`dayId`) REFERENCES `day` (`dayId`) ON DELETE CASCADE
 */

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
    length: 63
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
