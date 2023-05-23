"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = void 0;
var isNumber = function isNumber(value) {
  var parsedValue = Number(value);
  return !isNaN(parsedValue) && typeof parsedValue === 'number';
};
exports.isNumber = isNumber;