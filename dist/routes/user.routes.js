"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _userControllers = require("../controllers/user.controllers.js");
var _multer = _interopRequireDefault(require("../middlewares/multer.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get('/', _userControllers._getAllUsers);
router.post('/', (0, _multer["default"])('pfp'), _userControllers.createUser);
router.post('/getUser', _userControllers.loginUser);
router.put('/updateUser', _userControllers.updateUser);
router.post('/updatePhoto', (0, _multer["default"])('pfp'), _userControllers.updatePhoto);
router.get('/logout', _userControllers.logout);
router.post('/deleteAccount', _userControllers.deleteAccount);
router.get('/cleanAccount', _userControllers.cleanAccount);
var _default = router;
exports["default"] = _default;