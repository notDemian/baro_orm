"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = exports.ingresosRoutes = exports.iaRoutes = exports.gastosRoutes = exports.frecuentesRoutes = exports["default"] = void 0;
var PREFIX = '/api';
var ROUTES = {
  main: {
    users: "".concat(PREFIX, "/users"),
    ingresos: "".concat(PREFIX, "/ingresos"),
    gastos: "".concat(PREFIX, "/gastos"),
    frecuentes: "".concat(PREFIX, "/frecuentes"),
    ia: "".concat(PREFIX, "/ia")
  }
};
var userRoutes = {
  index: '/',
  getUser: '/getUser',
  updateUser: '/updateUser',
  updatePhoto: '/updatePhoto',
  logout: '/logout',
  deleteAccount: '/deleteAccount',
  cleanAccount: '/cleanAccount',
  setProfile: '/setProfile'
};
exports.userRoutes = userRoutes;
var ingresosRoutes = {
  getIngresos: '/getIngresos',
  updateIngreso: '/updateIngreso'
};
exports.ingresosRoutes = ingresosRoutes;
var gastosRoutes = {
  createGastoDiario: '/createGastoDiario',
  getGastos: '/getGastos',
  getSemanas: '/getSemanas/:semana?',
  getDay: '/getDay/:day?',
  updateGasto: '/updateGasto'
};
exports.gastosRoutes = gastosRoutes;
var frecuentesRoutes = {
  index: '/',
  id: '/:id',
  getCobrosFreq: '/getCobrosFreq/:id',
  setCobrosFreqMonto: '/setCobrosFreqMonto/:id'
};
exports.frecuentesRoutes = frecuentesRoutes;
var iaRoutes = {
  getAllFreq: '/getAllFreq',
  getAllDiarios: '/getAllDiarios',
  getClassifications: '/getClassifications',
  getPredictions: '/getPredictions',
  test: '/test'
};
exports.iaRoutes = iaRoutes;
var _default = ROUTES;
exports["default"] = _default;