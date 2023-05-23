"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryFailedGuard = exports.assertNever = void 0;
const typeorm_1 = require("typeorm");
function assertNever(value) {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}
exports.assertNever = assertNever;
const queryFailedGuard = (err) => err instanceof typeorm_1.QueryFailedError;
exports.queryFailedGuard = queryFailedGuard;
