"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delFile = exports.getPriorityColor = exports.LIMITS = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
exports.LIMITS = {
    LIGHT: 2,
    MEDIUM: 7,
    HARD: 90,
};
const getPriorityColor = (daysTillNextCob) => {
    if (daysTillNextCob <= exports.LIMITS.LIGHT) {
        return 'Light';
    }
    else if (daysTillNextCob <= exports.LIMITS.MEDIUM) {
        return 'Medium';
    }
    else {
        return 'Light';
    }
};
exports.getPriorityColor = getPriorityColor;
function delFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const dir = (0, path_1.join)(__dirname, `../public/${file}`);
        (0, fs_1.unlink)(dir, (err) => {
            if (err)
                console.log(err);
        });
    });
}
exports.delFile = delFile;
