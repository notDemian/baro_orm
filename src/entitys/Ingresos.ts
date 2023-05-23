import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Day } from './Day'
import { User } from './User'
/**
 * CREATE TABLE `ingresos` (
  `ingId` int NOT NULL AUTO_INCREMENT,
  `ingDate` varchar(50) NOT NULL,
  `ingType` varchar(150) DEFAULT NULL,
  `ingAmount` float NOT NULL,
  `ingDescription` varchar(150) DEFAULT NULL,
  `usuId` int NOT NULL,
  PRIMARY KEY (`ingId`),
  KEY `usuId_idx` (`usuId`),
  CONSTRAINT `usuIdIng` FOREIGN KEY (`usuId`) REFERENCES `usuario` (`usuId`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
 */

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
  ingType!: string

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
