'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const ingresos_controllers_1 = require('..\\controllers\\ingresos.controllers');
const router = (0, express_1.Router)();
router.get('/getIngresos', ingresos_controllers_1.getIngresos);
router.post('/updateIngreso', ingresos_controllers_1.updateIngreso);
exports.default = router;