import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Frecuentes } from './Frecuentes'

/**
 * CREATE TABLE `cobros_fre` (
  `cobId` int NOT NULL AUTO_INCREMENT,
  `cobDate` varchar(20) NOT NULL,
  `freId` int NOT NULL,
  PRIMARY KEY (`cobId`),
  KEY `freIdCob_idx` (`freId`),
  CONSTRAINT `freIdCob` FOREIGN KEY (`freId`) REFERENCES `frecuentes` (`freId`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
 */

@Entity({
  name: 'cobros_fre'
})
export class CobrosFreq extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'cobId',
    type: 'int'
  })
  cobId: number

  @Column({
    name: 'cobDate',
    type: 'varchar',
    length: 20
  })
  cobDate!: string

  @ManyToOne(() => Frecuentes, (freq) => freq.cobros)
  @JoinColumn()
  frecuente: Frecuentes
}
