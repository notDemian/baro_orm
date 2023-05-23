"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _frecuentesControllers = require("../controllers/frecuentes.controllers.js");
var router = (0, _express.Router)();
router.route('/').get(_frecuentesControllers.GET_ALL_freq).post(_frecuentesControllers.POST_freq);
router.route('/:id').get(_frecuentesControllers.GET_freq).put(_frecuentesControllers.PUT_freq)["delete"](_frecuentesControllers.DELETE_freq);
var _default = router;
exports["default"] = _default;