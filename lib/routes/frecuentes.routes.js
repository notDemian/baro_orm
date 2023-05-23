'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const frecuentes_controllers_1 = require('..\\controllers\\frecuentes.controllers');
const router = (0, express_1.Router)();
router.route('/').get(frecuentes_controllers_1.GET_ALL_freq).post(frecuentes_controllers_1.POST_freq);
router.route('/:id').get(frecuentes_controllers_1.GET_freq).put(frecuentes_controllers_1.PUT_freq).delete(frecuentes_controllers_1.DELETE_freq);
exports.default = router;