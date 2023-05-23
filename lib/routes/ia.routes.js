'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const ia_controllers_1 = require('..\\controllers\\ia.controllers');
const router = (0, express_1.Router)();
router.get('/getAllFreq', ia_controllers_1.IA_GET_ALL_FREQ);
router.get('/getAllDiarios', ia_controllers_1.IA_GET_ALL_DIARIOS);
exports.default = router;