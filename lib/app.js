'use strict';
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const cors_1 = __importDefault(require('cors'));
const express_1 = __importDefault(require('express'));
const morgan_1 = __importDefault(require('morgan'));
const path_1 = require('path');
// Routes
const frecuentes_routes_1 = __importDefault(require('./routes\\frecuentes.routes'));
const gastos_routes_1 = __importDefault(require('./routes\\gastos.routes'));
const ia_routes_1 = __importDefault(require('./routes\\ia.routes'));
const ingresos_routes_1 = __importDefault(require('./routes\\ingresos.routes'));
const user_routes_1 = __importDefault(require('./routes\\user.routes'));
const __public = (0, path_1.join)(__dirname, '/public');
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.static(__public));
app.use((0, cors_1.default)({
    credentials: true,
    origin: true
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use('/api/users', user_routes_1.default);
app.use('/api/ingresos', ingresos_routes_1.default);
app.use('/api/gastos', gastos_routes_1.default);
app.use('/api/frecuentes', frecuentes_routes_1.default);
app.use('/api/ia', ia_routes_1.default);
exports.default = app;