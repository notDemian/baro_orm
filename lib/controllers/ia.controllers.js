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
Object.defineProperty(exports, '__esModule', { value: true });
exports.IA_GET_ALL_DIARIOS = exports.IA_GET_ALL_FREQ = void 0;
const Diarios_1 = require('..\\entitys\\Diarios');
const Frecuentes_1 = require('..\\entitys\\Frecuentes');
const IA_GET_ALL_FREQ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ALL_FRECUENTES = yield Frecuentes_1.Frecuentes.find();
        return res.status(200).json({
            message: 'Gastos frecuentes',
            data: ALL_FRECUENTES
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});
exports.IA_GET_ALL_FREQ = IA_GET_ALL_FREQ;
const IA_GET_ALL_DIARIOS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ALL_DIARIOS = yield Diarios_1.Diarios.find();
        return res.status(200).json({
            message: 'Gastos frecuentes',
            data: ALL_DIARIOS
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});
exports.IA_GET_ALL_DIARIOS = IA_GET_ALL_DIARIOS;