"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const __public = (0, path_1.join)(__dirname, '../public');
const storage = multer_1.default.diskStorage({
    destination: __public,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.${file.originalname.split('.').at(-1)}`);
    },
});
exports.default = (fieldname) => (0, multer_1.default)({
    dest: __public,
    storage,
}).single(fieldname);
