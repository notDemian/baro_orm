"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _iaControllers = require("../controllers/ia.controllers.js");
var _Errors = require("../middlewares/ErrorHandlers/Errors.js");
var _ROUTES = require("../utils/ROUTES.js");
var router = (0, _express.Router)();
router.get(_ROUTES.iaRoutes.getAllFreq, _iaControllers.IA_GET_ALL_FREQ);
router.get(_ROUTES.iaRoutes.getAllDiarios, _iaControllers.IA_GET_ALL_DIARIOS);
router.get(_ROUTES.iaRoutes.getClassifications, [_Errors.authUser], _iaControllers.GET_CLASSIFICATIONS_IA);
router.get(_ROUTES.iaRoutes.getPredictions, [_Errors.authUser], _iaControllers.GET_PREDICTIONS_IA);
router.post(_ROUTES.iaRoutes.test, _iaControllers.test);
var _default = router;
exports["default"] = _default;