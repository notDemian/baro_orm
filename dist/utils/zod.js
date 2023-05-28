"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.z_UserToken = void 0;
var _zod = require("zod");
var z_UserToken = _zod.z.object({
  usuId: _zod.z.number(),
  dataUser: _zod.z.object({
    datId: _zod.z.number()
  })
});
exports.z_UserToken = z_UserToken;