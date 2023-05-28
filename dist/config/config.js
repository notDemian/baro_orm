"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SECRET = exports.PORT = exports.NODE_ENV = exports.MYSQLUSER = exports.MYSQLPORT = exports.MYSQLPASSWORD = exports.MYSQLHOST = exports.MYSQLDATABASE = exports.API_IA_URL = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var NODE_ENV = process.env.NODE_ENV;
exports.NODE_ENV = NODE_ENV;
var IS_DEV = false;
// NODE_ENV === 'dev'
var PORT = process.env.PORT;
exports.PORT = PORT;
var SECRET = process.env.SECRET || 'secret';
exports.SECRET = SECRET;
var MYSQLDATABASE = IS_DEV ? 'baro' : process.env.MYSQLDATABASE;
exports.MYSQLDATABASE = MYSQLDATABASE;
var MYSQLUSER = IS_DEV ? 'root' : process.env.MYSQLUSER;
exports.MYSQLUSER = MYSQLUSER;
var MYSQLPASSWORD = IS_DEV ? '554721' : process.env.MYSQLPASSWORD;
exports.MYSQLPASSWORD = MYSQLPASSWORD;
var MYSQLHOST = IS_DEV ? 'localhost' : process.env.MYSQLHOST;
exports.MYSQLHOST = MYSQLHOST;
var MYSQLPORT = IS_DEV ? 3306 : parseInt(process.env.MYSQLPORT || '3306');
exports.MYSQLPORT = MYSQLPORT;
var API_IA_URL = IS_DEV ? 'http://192.168.19.73:5000' : 'https://services-ia-baro.up.railway.app';
exports.API_IA_URL = API_IA_URL;