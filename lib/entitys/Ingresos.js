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
exports.Ingresos = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
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
let Ingresos = class Ingresos extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'ingId',
        type: 'int'
    }),
    __metadata("design:type", Number)
], Ingresos.prototype, "ingId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ingDate',
        type: 'varchar',
        length: 50
    }),
    __metadata("design:type", String)
], Ingresos.prototype, "ingDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ingType',
        type: 'varchar',
        length: 150
    }),
    __metadata("design:type", String)
], Ingresos.prototype, "ingType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ingAmount',
        type: 'float'
    }),
    __metadata("design:type", Number)
], Ingresos.prototype, "ingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ingDescription',
        type: 'varchar',
        length: 150
    }),
    __metadata("design:type", String)
], Ingresos.prototype, "ingDescription", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.ingresos, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], Ingresos.prototype, "user", void 0);
Ingresos = __decorate([
    (0, typeorm_1.Entity)({
        name: 'ingresos'
    })
], Ingresos);
exports.Ingresos = Ingresos;
