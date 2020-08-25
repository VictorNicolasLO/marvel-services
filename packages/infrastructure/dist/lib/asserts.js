"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNumber = exports.assertString = void 0;
const assert_1 = __importDefault(require("assert"));
exports.assertString = (value, message) => assert_1.default(typeof value === 'string', message);
exports.assertNumber = (value, message) => assert_1.default(typeof value === 'number', message);
//# sourceMappingURL=asserts.js.map