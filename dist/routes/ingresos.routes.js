"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ingresosControllers = require("../controllers/ingresos.controllers.js");
var router = (0, _express.Router)();
router.get('/getIngresos', _ingresosControllers.getIngresos);
router.post('/updateIngreso', _ingresosControllers.updateIngreso);
var _default = router;
exports["default"] = _default;