'use strict';
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const user_controllers_1 = require('..\\controllers\\user.controllers');
const multer_1 = __importDefault(require('..\\middlewares\\multer'));
const router = (0, express_1.Router)();
router.get('/', user_controllers_1._getAllUsers);
router.post('/', (0, multer_1.default)('pfp'), user_controllers_1.createUser);
router.post('/getUser', user_controllers_1.loginUser);
router.put('/updateUser', user_controllers_1.updateUser);
router.post('/updatePhoto', (0, multer_1.default)('pfp'), user_controllers_1.updatePhoto);
router.get('/logout', user_controllers_1.logout);
router.post('/deleteAccount', user_controllers_1.deleteAccount);
router.get('/cleanAccount', user_controllers_1.cleanAccount);
exports.default = router;