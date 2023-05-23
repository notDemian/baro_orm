"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _path = require("path");
var _frecuentesRoutes = _interopRequireDefault(require("./routes/frecuentes.routes.js"));
var _gastosRoutes = _interopRequireDefault(require("./routes/gastos.routes.js"));
var _iaRoutes = _interopRequireDefault(require("./routes/ia.routes.js"));
var _ingresosRoutes = _interopRequireDefault(require("./routes/ingresos.routes.js"));
var _userRoutes = _interopRequireDefault(require("./routes/user.routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Routes

var __public = (0, _path.join)(__dirname, '/public');
var app = (0, _express["default"])();

// Middlewares
app.use(_express["default"]["static"](__public));
app.use((0, _cors["default"])({
  credentials: true,
  origin: true
}));
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use('/api/users', _userRoutes["default"]);
app.use('/api/ingresos', _ingresosRoutes["default"]);
app.use('/api/gastos', _gastosRoutes["default"]);
app.use('/api/frecuentes', _frecuentesRoutes["default"]);
app.use('/api/ia', _iaRoutes["default"]);
var _default = app;
exports["default"] = _default;