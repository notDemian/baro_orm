"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LAPSES_TO_INT = void 0;
const moment_1 = __importDefault(require("moment"));
exports.LAPSES_TO_INT = {
    Semanal: (date) => (0, moment_1.default)(date).add(1, 'week'),
    Quincenal: (date) => (0, moment_1.default)(date).add(2, 'week'),
    Mensual: (date) => (0, moment_1.default)(date).add(1, 'month'),
    Bimestral: (date) => (0, moment_1.default)(date).add(2, 'month'),
    Trimestral: (date) => (0, moment_1.default)(date).add(3, 'month'),
};
