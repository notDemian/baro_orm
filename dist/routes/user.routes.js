"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _userControllers = require("../controllers/user.controllers.js");
var _Errors = require("../middlewares/ErrorHandlers/Errors.js");
var _multer = _interopRequireDefault(require("../middlewares/multer.js"));
var _ROUTES = require("../utils/ROUTES.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get(_ROUTES.userRoutes.index, _userControllers._getAllUsers);
router.post(_ROUTES.userRoutes.index, (0, _multer["default"])('pfp'), _userControllers.createUser);
router.post(_ROUTES.userRoutes.getUser, _userControllers.loginUser);
router.put(_ROUTES.userRoutes.updateUser, [_Errors.authUser], _userControllers.updateUser);
router.post(_ROUTES.userRoutes.updatePhoto, [_Errors.authUser], (0, _multer["default"])('pfp'), _userControllers.updatePhoto);
router.get(_ROUTES.userRoutes.logout, _userControllers.logout);
router.post(_ROUTES.userRoutes.deleteAccount, [_Errors.authUser], _userControllers.deleteAccount);
router.get(_ROUTES.userRoutes.cleanAccount, [_Errors.authUser], _userControllers.cleanAccount);
var _default = router;
exports["default"] = _default;