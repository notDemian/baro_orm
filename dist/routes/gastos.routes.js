"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _gastosControllers = require("../controllers/gastos.controllers.js");
var router = (0, _express.Router)();
router.post('/createGastoDiario', _gastosControllers.createGastoDiario);
router.get('/getGastos', _gastosControllers.getGastos);
router.get('/getSemanas/:semana?', _gastosControllers.getSemanas);
router.get('/getDay/:day?', _gastosControllers.getDay);
router.post('/updateGasto', _gastosControllers.updateGasto);
var _default = router;
exports["default"] = _default;