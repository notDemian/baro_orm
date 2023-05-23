"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = void 0;
const isNumber = (value) => {
    const parsedValue = Number(value);
    return !isNaN(parsedValue) && typeof parsedValue === 'number';
};
exports.isNumber = isNumber;
