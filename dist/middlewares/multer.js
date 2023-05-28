"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = require("path");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var __public = (0, _path.join)(__dirname, '../public');
var storage = _multer["default"].diskStorage({
  destination: __public,
  filename: function filename(req, file, cb) {
    console.log({
      file: file
    });
    cb(null, "".concat(Date.now(), ".").concat(file.originalname.split('.').at(-1)));
  }
});
var _default = function _default(fieldname) {
  return (0, _multer["default"])({
    dest: __public,
    storage: storage
  }).single(fieldname);
};
exports["default"] = _default;