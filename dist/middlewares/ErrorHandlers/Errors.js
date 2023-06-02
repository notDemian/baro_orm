"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authUser = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = require("../../config/config.js");
var _helpers = require("../../utils/helpers.js");
var _zod = require("../../utils/zod.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var authUser = function authUser(req, res, next) {
  var _req$file;
  var filename = (_req$file = req.file) === null || _req$file === void 0 ? void 0 : _req$file.filename;
  try {
    var token = req.get('token');
    if (!token || token === '') {
      filename && (0, _helpers.delFile)(filename);
      return res.status(401).json({
        message: 'Token de acceso no válido'
      });
    }
    var jwt_ = _jsonwebtoken["default"].verify(token, _config.SECRET);
    var decodedUser = _zod.z_UserToken.safeParse(jwt_);
    if (!decodedUser.success) {
      filename && (0, _helpers.delFile)(filename);
      return res.status(401).json({
        message: 'Token de acceso no válido'
      });
    }
    res.locals.user = decodedUser.data;
    next();
  } catch (err) {
    console.log(err);
    filename && (0, _helpers.delFile)(filename);
    if (err instanceof _jsonwebtoken["default"].JsonWebTokenError) {
      return res.status(401).json({
        message: 'Token de acceso no válido'
      });
    }
    if (err instanceof _jsonwebtoken["default"].TokenExpiredError) {
      return res.status(401).json({
        message: 'Token de acceso expirado'
      });
    }
    return res.status(401).json({
      message: 'Usuario no autorizado'
    });
  }
};
exports.authUser = authUser;