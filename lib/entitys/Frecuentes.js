"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frecuentes = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Day_1 = require("./Day");
const CobrosFreq_1 = require("./CobrosFreq");
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
let Frecuentes = class Frecuentes extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'freId',
        type: 'int'
    }),
    __metadata("design:type", Number)
], Frecuentes.prototype, "freId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'freName',
        type: 'varchar',
        length: 50
    }),
    __metadata("design:type", String)
], Frecuentes.prototype, "freName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'freDescription',
        type: 'varchar',
        length: 150,
        nullable: true,
        default: null
    }),
    __metadata("design:type", String)
], Frecuentes.prototype, "freDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'freAmount',
        type: 'float'
    }),
    __metadata("design:type", Number)
], Frecuentes.prototype, "freAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'freLapse',
        type: 'varchar',
        length: 50
    }),
    __metadata("design:type", String)
], Frecuentes.prototype, "freLapse", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Day_1.Day, (day) => day.frecuentes, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Day_1.Day)
], Frecuentes.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.frecuentes, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], Frecuentes.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CobrosFreq_1.CobrosFreq, (cobros) => cobros.frecuente, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Frecuentes.prototype, "cobros", void 0);
Frecuentes = __decorate([
    (0, typeorm_1.Entity)({
        name: 'frecuentes'
    })
], Frecuentes);
exports.Frecuentes = Frecuentes;
