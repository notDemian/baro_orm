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
exports.Semanas = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Day_1 = require("./Day");
let Semanas = class Semanas extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'semId',
        type: 'int'
    }),
    __metadata("design:type", Number)
], Semanas.prototype, "semId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'semStart',
        type: 'varchar',
        length: 20
    }),
    __metadata("design:type", String)
], Semanas.prototype, "semStart", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'semEnd',
        type: 'varchar',
        length: 20
    }),
    __metadata("design:type", String)
], Semanas.prototype, "semEnd", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.semanas, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], Semanas.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Day_1.Day, (day) => day.semana),
    __metadata("design:type", Array)
], Semanas.prototype, "days", void 0);
Semanas = __decorate([
    (0, typeorm_1.Entity)({
        name: 'semanas'
    })
], Semanas);
exports.Semanas = Semanas;
