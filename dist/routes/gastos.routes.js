"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _gastosControllers = require("../controllers/gastos.controllers.js");
var _Errors = require("../middlewares/ErrorHandlers/Errors.js");
var router = (0, _express.Router)();
router.post('/createGastoDiario', [_Errors.authUser], _gastosControllers.createGastoDiario);
router.get('/getGastos', [_Errors.authUser], _gastosControllers.getGastos);
router.get('/getSemanas/:semana?', [_Errors.authUser], _gastosControllers.getSemanas);
router.get('/getDay/:day?', [_Errors.authUser], _gastosControllers.getDay);
router.post('/updateGasto', [_Errors.authUser], _gastosControllers.updateGasto);
var _default = router;
exports["default"] = _default;