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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Semanas_1 = require("./Semanas");
const Frecuentes_1 = require("./Frecuentes");
const Ingresos_1 = require("./Ingresos");
const DataUser_1 = require("./DataUser");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'usuId',
        type: 'int'
    }),
    __metadata("design:type", Number)
], User.prototype, "usuId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'usuEmail',
        type: 'varchar',
        length: 50,
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "usuEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'usuPassword',
        type: 'varchar',
        length: 300
    }),
    __metadata("design:type", String)
], User.prototype, "usuPassword", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => DataUser_1.DataUser, (dat) => dat.user, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", DataUser_1.DataUser)
], User.prototype, "dataUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Semanas_1.Semanas, (sem) => sem.user),
    __metadata("design:type", Array)
], User.prototype, "semanas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Frecuentes_1.Frecuentes, (freq) => freq.user),
    __metadata("design:type", Array)
], User.prototype, "frecuentes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Ingresos_1.Ingresos, (ing) => ing.user),
    __metadata("design:type", Array)
], User.prototype, "ingresos", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({
        name: 'usuario'
    })
], User);
exports.User = User;
