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
exports.Day = void 0;
const typeorm_1 = require("typeorm");
const Semanas_1 = require("./Semanas");
const Diarios_1 = require("./Diarios");
const Frecuentes_1 = require("./Frecuentes");
let Day = class Day extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'dayId',
        type: 'int'
    }),
    __metadata("design:type", Number)
], Day.prototype, "dayId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'dayDate',
        type: 'varchar',
        length: 20
    }),
    __metadata("design:type", String)
], Day.prototype, "dayDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Semanas_1.Semanas, (semana) => semana.days, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Semanas_1.Semanas)
], Day.prototype, "semana", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Diarios_1.Diarios, (diario) => diario.day),
    __metadata("design:type", Array)
], Day.prototype, "diarios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Frecuentes_1.Frecuentes, (freq) => freq.day),
    __metadata("design:type", Array)
], Day.prototype, "frecuentes", void 0);
Day = __decorate([
    (0, typeorm_1.Entity)({
        name: 'day'
    })
], Day);
exports.Day = Day;
