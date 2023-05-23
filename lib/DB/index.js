'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppDataSource = void 0;
const CobrosFreq_1 = require('..\\entitys\\CobrosFreq');
const DataUser_1 = require('..\\entitys\\DataUser');
const Day_1 = require('..\\entitys\\Day');
const Diarios_1 = require('..\\entitys\\Diarios');
const Frecuentes_1 = require('..\\entitys\\Frecuentes');
const Ingresos_1 = require('..\\entitys\\Ingresos');
const Semanas_1 = require('..\\entitys\\Semanas');
const User_1 = require('..\\entitys\\User');
const typeorm_1 = require('typeorm');
const config_1 = require('..\\config\\config');
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: config_1.MYSQLHOST,
    port: config_1.MYSQLPORT,
    username: config_1.MYSQLUSER,
    password: config_1.MYSQLPASSWORD,
    database: config_1.MYSQLDATABASE,
    entities: [
        User_1.User,
        DataUser_1.DataUser,
        Semanas_1.Semanas,
        Day_1.Day,
        Diarios_1.Diarios,
        Frecuentes_1.Frecuentes,
        CobrosFreq_1.CobrosFreq,
        Ingresos_1.Ingresos
    ],
    // logging: true,
    synchronize: true,
    migrations: ['src/migrations/*.ts'],
    migrationsTableName: 'migrations_bd_baro'
});