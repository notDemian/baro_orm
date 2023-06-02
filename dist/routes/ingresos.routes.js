"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ingresosControllers = require("../controllers/ingresos.controllers.js");
var _Errors = require("../middlewares/ErrorHandlers/Errors.js");
var _ROUTES = require("../utils/ROUTES.js");
var router = (0, _express.Router)();
router.get(_ROUTES.ingresosRoutes.getIngresos, [_Errors.authUser], _ingresosControllers.getIngresos);
router.post(_ROUTES.ingresosRoutes.updateIngreso, [_Errors.authUser], _ingresosControllers.updateIngreso);
var _default = router;
exports["default"] = _default;