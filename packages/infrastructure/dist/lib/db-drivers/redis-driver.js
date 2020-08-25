"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisDriver = void 0;
const db_driver_1 = require("./db-driver");
const redis_1 = __importDefault(require("redis"));
const { promisify } = require("util");
const client = redis_1.default.createClient({
    url: process.env.REDIS_URL || "localhost"
});
const getAsync = promisify(client.get).bind(client);
const putAsync = promisify(client.set).bind(client);
class RedisDriver extends db_driver_1.KeyValueDbDriver {
    constructor(prefix) {
        super();
        this.prefix = prefix;
    }
    put(key, value) {
        return putAsync(`${this.prefix}/${key}`, JSON.stringify(value));
    }
    async get(key) {
        return JSON.parse(await getAsync(`${this.prefix}/${key}`));
    }
}
exports.RedisDriver = RedisDriver;
//# sourceMappingURL=redis-driver.js.map