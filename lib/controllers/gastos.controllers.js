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
exports.updateGasto = exports.getDay = exports.getSemanas = exports.getGastos = exports.createGastoDiario = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable indent */
const DataUser_1 = require('..\\entitys\\DataUser');
const Day_1 = require('..\\entitys\\Day');
const Diarios_1 = require('..\\entitys\\Diarios');
const Semanas_1 = require('..\\entitys\\Semanas');
const User_1 = require('..\\entitys\\User');
const user_services_1 = require('..\\services\\user.services');
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const moment_js_1 = __importDefault(require('moment/moment.js'));
const config_1 = require('..\\config\\config');
const Dates_1 = require('..\\utils\\Dates');
const controller_1 = require('..\\utils\\types\\Day\\controller');
const createGastoDiario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const {nombre, desc, monto, icono} = req.body;
        moment_js_1.default.locale('es');
        const today = (0, moment_js_1.default)().format(Dates_1.FORMATS.SIMPLE_DATE);
        const semStart = (0, moment_js_1.default)().startOf('week').format(Dates_1.FORMATS.SIMPLE_DATE);
        const semEnd = (0, moment_js_1.default)().endOf('week').format(Dates_1.FORMATS.SIMPLE_DATE);
        if (!nombre || !desc || !monto || icono === null)
            return res.status(400).json({ message: 'Faltan datos' });
        const Amount = parseFloat(monto);
        if (isNaN(Amount) || Amount <= 0)
            return res.status(400).json({ message: 'Gasto invalido' });
        const token = req.get('token');
        if (!token) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const decodedUser = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decodedUser.usuId) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const user = yield User_1.User.findOneOrFail({
            where: { usuId: decodedUser.usuId },
            relations: { dataUser: true }
        });
        const ActualBalance = user.dataUser.datBalance;
        const newBalance = ActualBalance - Amount;
        if (ActualBalance < Amount) {
            return res.status(400).json({ message: 'No tienes suficiente dinero' });
        }
        let finalDay;
        const semanaFound = yield Semanas_1.Semanas.findOne({
            where: {
                semEnd,
                semStart
            },
            relations: { days: true }
        });
        if (!semanaFound) {
            const semanaCreated = Semanas_1.Semanas.create({
                semEnd,
                semStart,
                user
            });
            const semana = yield semanaCreated.save();
            const dayCreated = Day_1.Day.create({
                dayDate: today,
                semana: semana
            });
            finalDay = yield dayCreated.save();
        } else {
            const dayFound = semanaFound.days.find(day => day.dayDate === today);
            if (!dayFound) {
                const dayCreated = Day_1.Day.create({
                    dayDate: today,
                    semana: semanaFound
                });
                finalDay = yield dayCreated.save();
            } else {
                finalDay = dayFound;
            }
        }
        const diario = Diarios_1.Diarios.create({
            diaAmount: Amount,
            diaDescription: desc,
            diaIcon: icono,
            diaName: nombre,
            day: finalDay
        });
        yield diario.save();
        user.dataUser.datBalance = newBalance;
        yield user.dataUser.save();
        return res.status(200).json({
            message: 'Gasto creado',
            newBalance
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Usuario no encontrado' });
    }
});
exports.createGastoDiario = createGastoDiario;
const getGastos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.get('token');
        if (!token || token === '') {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const decodedUser = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decodedUser.usuId) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        //get the last 10 gastos
        const gastos = yield Diarios_1.Diarios.find({
            where: { day: { semana: { user: { usuId: decodedUser.usuId } } } },
            order: { diaId: 'DESC' },
            take: 10
        });
        return res.status(200).json({
            message: 'Gastos obtenidos',
            gastos
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error interno' });
    }
});
exports.getGastos = getGastos;
const getSemanas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const {semana} = req.params;
        moment_js_1.default.locale('es');
        const semStart = (0, Dates_1.getSemStart)().format(Dates_1.FORMATS.SIMPLE_DATE);
        const semEnd = (0, Dates_1.getSemEnd)().format(Dates_1.FORMATS.SIMPLE_DATE);
        const semanaStart = (0, Dates_1.getSemStart)(semana).format(Dates_1.FORMATS.SIMPLE_DATE);
        const semanaEnd = (0, Dates_1.getSemEnd)(semana).format(Dates_1.FORMATS.SIMPLE_DATE);
        const token = req.get('token');
        if (!token) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const decodedUser = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decodedUser.usuId) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const semanaFound = yield Semanas_1.Semanas.findOne({
            where: {
                semStart: semana && semana !== '' ? semanaStart : semStart,
                user: { usuId: decodedUser.usuId }
            },
            order: { semStart: 'DESC' },
            relations: { days: { diarios: true } }
        });
        if (!semanaFound) {
            return res.status(400).json({ message: 'No hay semana' });
        }
        const dates = [];
        const stadisticInfo = {
            avgWeek: 0,
            vsLastWeek: 0,
            biggestExpense: 0
        };
        const startDate = (0, moment_js_1.default)(semanaFound.semStart);
        const endDate = (0, moment_js_1.default)(semanaFound.semEnd);
        while (startDate.diff(endDate) <= 0) {
            dates.push(startDate.format(Dates_1.FORMATS.SIMPLE_DATE));
            startDate.add(1, 'days');
        }
        let nextWeek = null;
        let prevWeek = null;
        if (semana && semana !== '') {
            nextWeek = (0, moment_js_1.default)(semana).endOf('week').add(1, 'day').format(Dates_1.FORMATS.SIMPLE_DATE);
            prevWeek = (0, moment_js_1.default)(semana).startOf('week').subtract(1, 'day').format(Dates_1.FORMATS.SIMPLE_DATE);
        } else {
            nextWeek = (0, Dates_1.getSemEnd)().add(1, 'day').format(Dates_1.FORMATS.SIMPLE_DATE);
            prevWeek = (0, Dates_1.getSemStart)().subtract(1, 'day').format(Dates_1.FORMATS.SIMPLE_DATE);
        }
        const nextWeekFound = yield Semanas_1.Semanas.findOne({
            where: {
                semStart: nextWeek,
                user: { usuId: decodedUser.usuId }
            },
            order: { semStart: 'DESC' }
        });
        const prevWeekFound = yield Semanas_1.Semanas.findOne({
            where: {
                semStart: prevWeek,
                user: { usuId: decodedUser.usuId }
            },
            order: { semStart: 'DESC' }
        });
        nextWeek = nextWeekFound ? nextWeek : null;
        prevWeek = prevWeekFound ? prevWeek : null;
        let totalLastWeek = 0;
        if (prevWeekFound) {
            const semId = prevWeekFound.semId;
            const {sum} = yield Diarios_1.Diarios.createQueryBuilder('diarios').select('SUM(diarios.diaAmount)', 'sum').innerJoin('day', 'day').where('day.semanaSemId = :semId', { semId }).getRawOne();
            totalLastWeek = sum;
        }
        const finalDays = [];
        for (const e of dates) {
            const diafiltered = semanaFound.days.find(day => day.dayDate === e);
            if (!diafiltered) {
                finalDays.push({
                    dayId: undefined,
                    dayDate: e,
                    dayTotal: 0
                });
                continue;
            }
            const {dayId, dayDate} = diafiltered;
            const {sum: dayTotal} = (_a = yield Diarios_1.Diarios.createQueryBuilder('diarios').select('SUM(diarios.diaAmount)', 'sum').where('diarios.dayDayId = :dayId', { dayId }).getRawOne()) !== null && _a !== void 0 ? _a : { sum: 0 };
            if (dayTotal > stadisticInfo.biggestExpense)
                stadisticInfo.biggestExpense = dayTotal;
            finalDays.push({
                dayId,
                dayDate,
                dayTotal
            });
        }
        const totalWeek = finalDays.reduce((acc, e) => {
            if (e)
                return acc + e.dayTotal;
            return acc;
        }, 0);
        stadisticInfo.avgWeek = totalWeek / finalDays.length;
        stadisticInfo.vsLastWeek = totalLastWeek - totalWeek;
        return res.status(200).json({
            message: 'semanas recuperadas exitosamente',
            finalDays,
            actualWeek: semana && semana !== '' ? `${ semanaStart } / ${ semanaEnd }` : `${ semStart } / ${ semEnd }`,
            nextWeek,
            prevWeek,
            stadisticInfo
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error interno' });
    }
});
exports.getSemanas = getSemanas;
const getDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const {day} = req.params;
        const token = req.get('token');
        if (!token) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        const decodedUser = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decodedUser.usuId) {
            return res.status(400).json({ message: 'Token de acceso no válido' });
        }
        moment_js_1.default.locale('es');
        const Today = (0, moment_js_1.default)(day);
        if (!Today.isValid()) {
            return res.status(400).json({ message: 'Introduce una fecha válida' });
        }
        const FormatDay = Today.format(Dates_1.FORMATS.SIMPLE_DATE);
        const lastDay = Today.subtract(1, 'day').format(Dates_1.FORMATS.SIMPLE_DATE);
        const nextDay = Today.add(2, 'day').format(Dates_1.FORMATS.SIMPLE_DATE);
        const [dayFoundRes, lastDayFoundRes, nextDayFoundRes] = yield Promise.allSettled([
            Day_1.Day.findOne({
                where: {
                    dayDate: FormatDay,
                    semana: { user: { usuId: decodedUser.usuId } }
                },
                relations: { diarios: true }
            }),
            Day_1.Day.findOne({
                where: {
                    dayDate: lastDay,
                    semana: { user: { usuId: decodedUser.usuId } }
                },
                relations: { diarios: true }
            }),
            Day_1.Day.findOne({
                where: {
                    dayDate: nextDay,
                    semana: { user: { usuId: decodedUser.usuId } }
                },
                relations: { diarios: true }
            })
        ]);
        if (dayFoundRes.status === 'rejected' || !dayFoundRes.value) {
            return res.status(400).json({ message: 'Día no encontrado' });
        }
        const dayFound = dayFoundRes.value;
        const lastDayFound = lastDayFoundRes.status === 'fulfilled' ? lastDayFoundRes.value : null;
        const nextDayFound = nextDayFoundRes.status === 'fulfilled' ? nextDayFoundRes.value : null;
        const days = {
            lastDay: null,
            nextDay: null
        };
        const totalLastDay = (_b = lastDayFound === null || lastDayFound === void 0 ? void 0 : lastDayFound.diarios.reduce((acc, e) => {
            if (e)
                return acc + e.diaAmount;
            return acc;
        }, 0)) !== null && _b !== void 0 ? _b : 0;
        const totalToday = dayFound.diarios.reduce((acc, e) => {
            if (e)
                return acc + e.diaAmount;
            return acc;
        }, 0);
        let mostExpensiveCharge = 0;
        dayFound.diarios.forEach(day => {
            if (day.diaAmount > mostExpensiveCharge)
                mostExpensiveCharge = day.diaAmount;
        });
        const diffDays = totalLastDay - totalToday;
        const avgDay = !isNaN(totalToday / dayFound.diarios.length) ? totalToday / dayFound.diarios.length : 0;
        const byAmount = [
            0,
            0,
            0,
            0,
            0
        ];
        dayFound.diarios.forEach(day => {
            const amount = day.diaAmount;
            if (amount > 0 && amount <= controller_1.LIMITS.LVL1) {
                byAmount[0]++;
            } else if (amount <= controller_1.LIMITS.LVL2) {
                byAmount[1]++;
            } else if (amount <= controller_1.LIMITS.LVL3) {
                byAmount[2]++;
            } else if (amount <= controller_1.LIMITS.LVL4) {
                byAmount[3]++;
            } else {
                byAmount[4]++;
            }
        });
        // first capital letter dayname
        const dayName = (0, moment_js_1.default)(FormatDay).format('dddd').replace(/^\w/, c => c.toUpperCase());
        return res.status(200).json({
            gastosDia: dayFound.diarios,
            avgDay,
            diffDays,
            mostExpensiveCharge,
            byAmount,
            days,
            dayName
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error interno' });
    }
});
exports.getDay = getDay;
const updateGasto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const {newDescripcion, newMonto, newIcono, newNombre, id} = req.body;
    if (!newDescripcion || newMonto === undefined || newIcono === undefined || !newNombre || !id)
        return res.status(400).json({ message: 'Faltan datos' });
    if (newMonto <= 0)
        return res.status(400).json({ message: 'Monto invalido' });
    try {
        const token = req.get('token');
        if (!token)
            return res.status(400).json({ message: 'Token de acceso no válido' });
        const decodedUser = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decodedUser.usuId)
            return res.status(400).json({ message: 'Token de acceso no válido' });
        const [datBalance, err] = yield (0, user_services_1.getBalance)(decodedUser.usuId);
        if (datBalance === undefined)
            return res.status(400).json({ message: 'Usuario no encontrado' });
        const diarioFound = yield Diarios_1.Diarios.findOne({ where: { diaId: id } });
        if (!diarioFound)
            return res.status(400).json({ message: 'No hay gasto' });
        const diaAmount = diarioFound.diaAmount;
        const delta = diaAmount - newMonto;
        const newBalance = datBalance + delta;
        if (newBalance < 0)
            return res.status(400).json({ message: 'No puedes introducir esa cantidad' });
        const updatedDiario = yield Diarios_1.Diarios.update({ diaId: id }, {
            diaDescription: newDescripcion,
            diaAmount: newMonto,
            diaIcon: newIcono,
            diaName: newNombre
        });
        if (!updatedDiario.affected)
            return res.status(400).json({ message: 'No se pudo actualizar el gasto' });
        const updatedBalance = yield DataUser_1.DataUser.update({ datId: decodedUser.dataUser.datId }, { datBalance: newBalance });
        if (!updatedBalance.affected)
            return res.status(400).json({ message: 'No se pudo actualizar el balance' });
        return res.status(200).json({
            message: 'Gasto actualizado',
            newBalance
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});
exports.updateGasto = updateGasto;