"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _frecuentesControllers = require("../controllers/frecuentes.controllers.js");
var _Errors = require("../middlewares/ErrorHandlers/Errors.js");
var _ROUTES = require("../utils/ROUTES.js");
var router = (0, _express.Router)();
router.route(_ROUTES.frecuentesRoutes.index).get(_Errors.authUser, _frecuentesControllers.GET_ALL_freq).post(_Errors.authUser, _frecuentesControllers.POST_freq);
router.route(_ROUTES.frecuentesRoutes.id).get(_Errors.authUser, _frecuentesControllers.GET_freq).put(_Errors.authUser, _frecuentesControllers.PUT_freq)["delete"](_Errors.authUser, _frecuentesControllers.DELETE_freq);
router.get(_ROUTES.frecuentesRoutes.getCobrosFreq, [_Errors.authUser], _frecuentesControllers.getCobrosFreq);
router.put(_ROUTES.frecuentesRoutes.setCobrosFreqMonto, [_Errors.authUser], _frecuentesControllers.setCobroFreqAmount);
var _default = router;
exports["default"] = _default;