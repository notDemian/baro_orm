"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _gastosControllers = require("../controllers/gastos.controllers.js");
var _Errors = require("../middlewares/ErrorHandlers/Errors.js");
var _ROUTES = require("../utils/ROUTES.js");
var router = (0, _express.Router)();
router.post(_ROUTES.gastosRoutes.createGastoDiario, [_Errors.authUser], _gastosControllers.createGastoDiario);
router.get(_ROUTES.gastosRoutes.getGastos, [_Errors.authUser], _gastosControllers.getGastos);
router.get(_ROUTES.gastosRoutes.getSemanas, [_Errors.authUser], _gastosControllers.getSemanas);
router.get(_ROUTES.gastosRoutes.getDay, [_Errors.authUser], _gastosControllers.getDay);
router.post(_ROUTES.gastosRoutes.updateGasto, [_Errors.authUser], _gastosControllers.updateGasto);
var _default = router;
exports["default"] = _default;