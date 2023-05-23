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
exports.Diarios = void 0;
const typeorm_1 = require("typeorm");
const Day_1 = require("./Day");
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
let Diarios = class Diarios extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'diaId',
        type: 'int'
    }),
    __metadata("design:type", Number)
], Diarios.prototype, "diaId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'diaName',
        type: 'varchar',
        length: 50
    }),
    __metadata("design:type", String)
], Diarios.prototype, "diaName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'diaDescription',
        type: 'varchar',
        length: 150
    }),
    __metadata("design:type", String)
], Diarios.prototype, "diaDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'diaAmount',
        type: 'float'
    }),
    __metadata("design:type", Number)
], Diarios.prototype, "diaAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'diaIcon',
        type: 'int'
    }),
    __metadata("design:type", Number)
], Diarios.prototype, "diaIcon", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'diaCategory',
        type: 'varchar',
        length: 63,
        nullable: true,
        default: null
    }),
    __metadata("design:type", String)
], Diarios.prototype, "diaCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Day_1.Day, (day) => day.diarios, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Day_1.Day)
], Diarios.prototype, "day", void 0);
Diarios = __decorate([
    (0, typeorm_1.Entity)({
        name: 'diarios'
    })
], Diarios);
exports.Diarios = Diarios;
