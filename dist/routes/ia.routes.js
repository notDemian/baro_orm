"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _iaControllers = require("../controllers/ia.controllers.js");
var _Errors = require("../middlewares/ErrorHandlers/Errors.js");
var router = (0, _express.Router)();
router.get('/getAllFreq', _iaControllers.IA_GET_ALL_FREQ);
router.get('/getAllDiarios', _iaControllers.IA_GET_ALL_DIARIOS);
router.get('/getClassifications', [_Errors.authUser], _iaControllers.GET_CLASSIFICATIONS_IA);
router.post('/test', _iaControllers.test);
var _default = router;
exports["default"] = _default;