"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppDataSource = void 0;
var _CobrosFreq = require("../entitys/CobrosFreq.js");
var _DataUser = require("../entitys/DataUser.js");
var _Day = require("../entitys/Day.js");
var _Diarios = require("../entitys/Diarios.js");
var _Frecuentes = require("../entitys/Frecuentes.js");
var _Ingresos = require("../entitys/Ingresos.js");
var _Semanas = require("../entitys/Semanas.js");
var _User = require("../entitys/User.js");
var _typeorm = require("typeorm");
var _PlatformTools = require("typeorm/platform/PlatformTools");
var _config = require("../config/config.js");
var AppDataSource = new _typeorm.DataSource({
  type: 'mysql',
  driver: _PlatformTools.PlatformTools.load('mysql2'),
  host: _config.MYSQLHOST,
  port: _config.MYSQLPORT,
  username: _config.MYSQLUSER,
  password: _config.MYSQLPASSWORD,
  database: _config.MYSQLDATABASE,
  entities: [_User.User, _DataUser.DataUser, _Semanas.Semanas, _Day.Day, _Diarios.Diarios, _Frecuentes.Frecuentes, _CobrosFreq.CobrosFreq, _Ingresos.Ingresos],
  logging: true,
  synchronize: true
  // migrations: ['src/migrations/*.ts'],
  // migrationsTableName: 'migrations_bd_baro',
});
exports.AppDataSource = AppDataSource;