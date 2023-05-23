'use strict';
/* eslint-disable @typescript-eslint/no-unused-vars */
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
exports.DELETE_freq = exports.PUT_freq = exports.GET_freq = exports.GET_ALL_freq = exports.POST_freq = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
const CobrosFreq_1 = require('..\\entitys\\CobrosFreq');
const Day_1 = require('..\\entitys\\Day');
const Frecuentes_1 = require('..\\entitys\\Frecuentes');
const Semanas_1 = require('..\\entitys\\Semanas');
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
/* eslint-disable indent */
const moment_js_1 = __importDefault(require('moment/moment.js'));
const config_1 = require('..\\config\\config');
const Dates_1 = require('..\\utils\\Dates');
const Numbers_1 = require('..\\utils\\Numbers');
const helpers_1 = require('..\\utils\\helpers');
const controller_1 = require('..\\utils\\types\\Frecuentes\\controller');
const POST_freq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.get('token');
        if (!token) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const decodedUser = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decodedUser.usuId) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const {name, amount, lapse, description} = req.body;
        if (!name || !amount || // !date ||
            !lapse || name.trim() === '' || amount <= 0 || lapse.trim() === '') {
            return res.status(400).json({ message: 'Datos incompletos' });
        }
        const Today = (0, moment_js_1.default)();
        // date
        // if (!Day.isValid()) {
        //   return res.status(400).json({ message: 'Fecha no válida' })
        // }
        const today = Today.format(Dates_1.FORMATS.SIMPLE_DATE);
        const startOfWeek = (0, Dates_1.getSemStart)().format(Dates_1.FORMATS.SIMPLE_DATE);
        const dayFound = yield Day_1.Day.findOne({
            relations: { semana: true },
            where: {
                dayDate: today,
                semana: { user: { usuId: decodedUser.usuId } }
            }
        });
        let todayId;
        if (!dayFound) {
            const semanaFound = yield Semanas_1.Semanas.findOne({
                relations: { user: true },
                where: {
                    semStart: startOfWeek,
                    user: { usuId: decodedUser.usuId }
                }
            });
            if (!semanaFound) {
                const endOfWeek = Today.endOf('week').format(Dates_1.FORMATS.SIMPLE_DATE);
                const semanaCreated = yield Semanas_1.Semanas.create({
                    semStart: startOfWeek,
                    semEnd: endOfWeek,
                    user: { usuId: decodedUser.usuId }
                });
                const insertSemanas = yield semanaCreated.save();
                const dayCreated = Day_1.Day.create({
                    dayDate: today,
                    semana: insertSemanas
                });
                const insertDay = yield dayCreated.save();
                todayId = insertDay.dayId;
            } else {
                const dayCreated = Day_1.Day.create({
                    dayDate: today,
                    semana: semanaFound
                });
                const insertDay = yield dayCreated.save();
                todayId = insertDay.dayId;
            }
        } else {
            todayId = dayFound.dayId;
        }
        const freqCreated = Frecuentes_1.Frecuentes.create({
            freName: name,
            freDescription: description,
            freAmount: amount,
            freLapse: lapse,
            day: { dayId: todayId },
            user: { usuId: decodedUser.usuId }
        });
        const insertFreq = yield freqCreated.save();
        return res.status(201).json({
            message: 'Gasto creado',
            gasto: insertFreq
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al crear el gasto' });
    }
});
exports.POST_freq = POST_freq;
const GET_ALL_freq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.get('token');
        if (!token) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const decodedUser = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decodedUser.usuId) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const frecuentesFound = yield Frecuentes_1.Frecuentes.find({
            relations: { day: true },
            where: { user: { usuId: decodedUser.usuId } }
        });
        const Day = (0, moment_js_1.default)();
        const proximos = [];
        const notifications = [];
        for (const freq of frecuentesFound) {
            let lastCobDate = freq.day.dayDate;
            const cobroFound = yield CobrosFreq_1.CobrosFreq.findOne({
                where: { frecuente: { freId: freq.freId } },
                order: { cobDate: 'DESC' }
            });
            if (cobroFound) {
                lastCobDate = cobroFound.cobDate;
            }
            const lastCobDay = (0, moment_js_1.default)(lastCobDate);
            const nextCob = controller_1.LAPSES_TO_INT[freq.freLapse](lastCobDay);
            const daysTillNextCob = nextCob.diff(Day, 'days') + 1;
            if (daysTillNextCob <= 0) {
                const cobroCreated = CobrosFreq_1.CobrosFreq.create({
                    cobDate: nextCob.format(Dates_1.FORMATS.SIMPLE_DATE),
                    frecuente: { freId: freq.freId }
                });
                yield cobroCreated.save();
                notifications.push(`Se ha cobrado ${ freq.freName } por $${ freq.freAmount }`);
            }
            const nextCobDate = nextCob.format(Dates_1.FORMATS.SIMPLE_DATE);
            const priorityColor = (0, helpers_1.getPriorityColor)(daysTillNextCob);
            proximos.push(Object.assign(Object.assign({}, freq), {
                nextCobDate,
                daysTillNextCob,
                priorityColor
            }));
        }
        return res.status(200).json({
            message: 'Gastos frecuentes',
            frecuentes: frecuentesFound,
            proximos,
            notifications
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al obtener los gastos' });
    }
});
exports.GET_ALL_freq = GET_ALL_freq;
const GET_freq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const {id} = req.params;
        if (!id || !(0, Numbers_1.isNumber)(id)) {
            return res.status(400).json({ message: 'Id no válido' });
        }
        const token = req.get('token');
        if (!token) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const decodedUser = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decodedUser.usuId) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const freqFound = yield Frecuentes_1.Frecuentes.findOne({
            relations: { day: true },
            where: {
                freId: id,
                user: { usuId: decodedUser.usuId }
            }
        });
        if (!freqFound) {
            return res.status(404).json({ message: 'Gasto frecuente no encontrado' });
        }
        return res.status(200).json({
            message: 'Gasto frecuente',
            gasto: freqFound
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al obtener el gasto' });
    }
});
exports.GET_freq = GET_freq;
const PUT_freq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const {id} = req.params;
        if (!id || !(0, Numbers_1.isNumber)(id)) {
            return res.status(400).json({ message: 'Id no válido' });
        }
        const {name, amount, lapse, description} = req.body;
        if (!name && !amount && // !date &&
            !lapse) {
            return res.status(400).json({ message: 'Sin datos' });
        }
        if (amount && !(0, Numbers_1.isNumber)(amount))
            return res.status(400).json({ message: 'El monto debe ser un número' });
        if (lapse && lapse.trim() === '')
            return res.status(400).json({ message: 'El lapso no debe estar vacío' });
        if (name && name.trim() === '')
            return res.status(400).json({ message: 'El nombre no debe estar vacío' });
        const token = req.get('token');
        if (!token) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const decodedUser = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decodedUser.usuId) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const freqFound = yield Frecuentes_1.Frecuentes.findOne({
            where: {
                freId: id,
                user: { usuId: decodedUser.usuId }
            }
        });
        if (!freqFound) {
            return res.status(404).json({ message: 'Gasto frecuente no encontrado' });
        }
        if (name) {
            freqFound.freName = name;
        }
        if (amount) {
            freqFound.freAmount = amount;
        }
        if (lapse) {
            freqFound.freLapse = lapse;
        }
        if (description) {
            freqFound.freDescription = description;
        }
        console.log({ freqFound });
        yield freqFound.save();
        return res.status(200).json({
            message: 'Gasto frecuente',
            gasto: freqFound
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al obtener el gasto' });
    }
});
exports.PUT_freq = PUT_freq;
const DELETE_freq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const {id} = req.params;
        if (!id || !(0, Numbers_1.isNumber)(id)) {
            return res.status(400).json({ message: 'Id no válido' });
        }
        const token = req.get('token');
        if (!token) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const decodedUser = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decodedUser.usuId) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const removedFreq = yield Frecuentes_1.Frecuentes.createQueryBuilder('frecuentes').delete().from(Frecuentes_1.Frecuentes).where('freId = :id', { id }).execute();
        if (removedFreq.affected === 0) {
            return res.status(400).json({ message: 'Gasto no encontrado' });
        }
        return res.status(200).json({
            message: 'Gasto frecuente eliminado',
            ok: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al eliminar el gasto' });
    }
});
exports.DELETE_freq = DELETE_freq;