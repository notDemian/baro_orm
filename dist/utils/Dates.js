"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FORMATS = void 0;
exports.getSemEnd = getSemEnd;
exports.getSemStart = getSemStart;
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var FORMATS = {
  SIMPLE_DATE: 'YYYY-MM-DD'
};
exports.FORMATS = FORMATS;
function getSemEnd(date) {
  _moment["default"].locale('es');
  var dateEnd = (0, _moment["default"])(date);
  if (!dateEnd.isValid()) {
    return (0, _moment["default"])().endOf('week');
  }
  return dateEnd.endOf('week');
}
function getSemStart(date) {
  _moment["default"].locale('es');
  var dateStart = (0, _moment["default"])(date);
  if (!dateStart.isValid()) {
    return (0, _moment["default"])().startOf('week');
  }
  return dateStart.startOf('week');
}