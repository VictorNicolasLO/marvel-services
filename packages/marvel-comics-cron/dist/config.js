"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
require("dotenv").config();
const getEnv = (name) => {
    const envVar = process.env[name];
    assert_1.default(envVar, `${name} ENV not found`);
    return envVar;
};
exports.MARVEL_PRIVATE_KEY = getEnv("MARVEL_PRIVATE_KEY");
exports.MARVEL_PUBLIC_KEY = getEnv("MARVEL_PUBLIC_KEY");
exports.MARVEL_BASE_URL = getEnv("MARVEL_BASE_URL");
//# sourceMappingURL=config.js.map