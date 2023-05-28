"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _frecuentesControllers = require("../controllers/frecuentes.controllers.js");
var _Errors = require("../middlewares/ErrorHandlers/Errors.js");
var router = (0, _express.Router)();
router.route('/').get(_Errors.authUser, _frecuentesControllers.GET_ALL_freq).post(_Errors.authUser, _frecuentesControllers.POST_freq);
router.route('/:id').get(_Errors.authUser, _frecuentesControllers.GET_freq).put(_Errors.authUser, _frecuentesControllers.PUT_freq)["delete"](_Errors.authUser, _frecuentesControllers.DELETE_freq);
router.get('/getCobrosFreq/:id', [_Errors.authUser], _frecuentesControllers.getCobrosFreq);
var _default = router;
exports["default"] = _default;