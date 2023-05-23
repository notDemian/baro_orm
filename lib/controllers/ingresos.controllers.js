'use strict';
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator['throw'](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.updateIngreso = exports.getIngresos = void 0;
const DataUser_1 = require('..\\entitys\\DataUser');
const Ingresos_1 = require('..\\entitys\\Ingresos');
const user_services_1 = require('..\\services\\user.services');
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const moment_1 = __importDefault(require('moment'));
const config_1 = require('..\\config\\config');
const Dates_1 = require('..\\utils\\Dates');
const getIngresos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.get('token');
    if (!token || token === '') {
        return res.status(400).json({ message: 'Token de acceso no válido' });
    }
    const decodedUser = jsonwebtoken_1.default.verify(token, config_1.SECRET);
    if (!decodedUser.usuId) {
        return res.status(400).json({ message: 'Token de acceso no válido' });
    }
    const ingresosFoun = yield Ingresos_1.Ingresos.find({ where: { user: { usuId: decodedUser.usuId } } });
    return res.status(200).json({
        message: 'Ingresos obtenidos correctamente',
        ingresos: ingresosFoun
    });
});
exports.getIngresos = getIngresos;
const updateIngreso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const {ingreso, desc, tipo} = req.body;
    if (!ingreso || !desc || !tipo)
        return res.status(400).json({ message: 'Faltan datos' });
    if (parseFloat(ingreso) <= 0)
        return res.status(400).json({ message: 'Ingreso invalido' });
    try {
        const token = req.get('token');
        if (!token)
            return res.status(400).json({ message: 'No token' });
        const decodedUser = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decodedUser.usuId) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const Today = (0, moment_1.default)().format(Dates_1.FORMATS.SIMPLE_DATE);
        const [datBalance, err, userBD] = yield (0, user_services_1.getBalance)(decodedUser.usuId);
        if (datBalance === undefined || userBD === undefined)
            return res.status(400).json({ message: err !== null && err !== void 0 ? err : 'Error' });
        const newBalance = datBalance + parseFloat(ingreso);
        const ingresoInsert = Ingresos_1.Ingresos.create({
            ingAmount: parseFloat(ingreso),
            ingDate: Today,
            ingType: tipo,
            ingDescription: desc,
            user: userBD
        });
        yield ingresoInsert.save();
        const updatedBalance = yield DataUser_1.DataUser.update({ datId: decodedUser.dataUser.datId }, { datBalance: newBalance });
        if (!updatedBalance.affected)
            return res.status(400).json({ message: 'Error al actualizar el balance' });
        return res.status(200).json({
            message: 'Ingreso actualizado',
            newBalance
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});
exports.updateIngreso = updateIngreso;