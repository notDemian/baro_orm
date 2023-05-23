"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSemStart = exports.getSemEnd = exports.FORMATS = void 0;
const moment_1 = __importDefault(require("moment"));
exports.FORMATS = {
    SIMPLE_DATE: 'YYYY-MM-DD',
};
function getSemEnd(date) {
    moment_1.default.locale('es');
    const dateEnd = (0, moment_1.default)(date);
    if (!dateEnd.isValid()) {
        return (0, moment_1.default)().endOf('week');
    }
    return dateEnd.endOf('week');
}
exports.getSemEnd = getSemEnd;
function getSemStart(date) {
    moment_1.default.locale('es');
    const dateStart = (0, moment_1.default)(date);
    if (!dateStart.isValid()) {
        return (0, moment_1.default)().startOf('week');
    }
    return dateStart.startOf('week');
}
exports.getSemStart = getSemStart;
