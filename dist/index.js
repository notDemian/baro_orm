"use strict";

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));
require("moment/locale/es");
require("reflect-metadata");
var _app = _interopRequireDefault(require("./app.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_momentTimezone["default"].locale('es');
_momentTimezone["default"].tz.setDefault('America/Mexico_City');
var app = new _app["default"]();
app.init();