"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MYSQLPORT = exports.MYSQLHOST = exports.MYSQLPASSWORD = exports.MYSQLUSER = exports.MYSQLDATABASE = exports.SECRET = exports.PORT = exports.NODE_ENV = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.NODE_ENV = process.env.NODE_ENV;
const IS_DEV = exports.NODE_ENV === 'dev';
exports.PORT = process.env.PORT;
exports.SECRET = process.env.SECRET || 'secret';
exports.MYSQLDATABASE = IS_DEV ? 'baro' : process.env.MYSQLDATABASE;
exports.MYSQLUSER = IS_DEV ? 'root' : process.env.MYSQLUSER;
exports.MYSQLPASSWORD = IS_DEV ? '554721' : process.env.MYSQLPASSWORD;
exports.MYSQLHOST = IS_DEV ? 'localhost' : process.env.MYSQLHOST;
exports.MYSQLPORT = IS_DEV
    ? 3306
    : parseInt(process.env.MYSQLPORT || '3306');
