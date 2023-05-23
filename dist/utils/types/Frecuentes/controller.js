"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LAPSES_TO_INT = void 0;
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var LAPSES_TO_INT = {
  Semanal: function Semanal(date) {
    return (0, _moment["default"])(date).add(1, 'week');
  },
  Quincenal: function Quincenal(date) {
    return (0, _moment["default"])(date).add(2, 'week');
  },
  Mensual: function Mensual(date) {
    return (0, _moment["default"])(date).add(1, 'month');
  },
  Bimestral: function Bimestral(date) {
    return (0, _moment["default"])(date).add(2, 'month');
  },
  Trimestral: function Trimestral(date) {
    return (0, _moment["default"])(date).add(3, 'month');
  }
};
exports.LAPSES_TO_INT = LAPSES_TO_INT;