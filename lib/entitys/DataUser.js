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
exports.DataUser = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let DataUser = class DataUser extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'datId',
        type: 'int'
    }),
    __metadata("design:type", Number)
], DataUser.prototype, "datId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'datName',
        type: 'varchar',
        length: 50
    }),
    __metadata("design:type", String)
], DataUser.prototype, "datName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'datPhoto',
        type: 'varchar',
        length: 50,
        default: 'default_pfp.png'
    }),
    __metadata("design:type", String)
], DataUser.prototype, "datPhoto", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'datProfile',
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], DataUser.prototype, "datProfile", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'datBalance',
        type: 'float',
        default: 0
    }),
    __metadata("design:type", Number)
], DataUser.prototype, "datBalance", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.dataUser),
    __metadata("design:type", User_1.User)
], DataUser.prototype, "user", void 0);
DataUser = __decorate([
    (0, typeorm_1.Entity)({
        name: 'data_usuario'
    })
], DataUser);
exports.DataUser = DataUser;
