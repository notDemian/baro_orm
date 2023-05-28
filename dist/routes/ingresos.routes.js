"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ingresosControllers = require("../controllers/ingresos.controllers.js");
var _Errors = require("../middlewares/ErrorHandlers/Errors.js");
var router = (0, _express.Router)();
router.get('/getIngresos', [_Errors.authUser], _ingresosControllers.getIngresos);
router.post('/updateIngreso', [_Errors.authUser], _ingresosControllers.updateIngreso);
var _default = router;
exports["default"] = _default;