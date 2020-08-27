"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisDriver = void 0;
const db_driver_1 = require("./db-driver");
const redis_1 = __importDefault(require("redis"));
const redlock_1 = __importDefault(require("redlock"));
const { promisify } = require("util");
console.log(process.env.REDIS_URL);
let client;
let getAsync;
let putAsync;
let redLock;
class RedisDriver extends db_driver_1.KeyValueDbDriver {
    constructor(prefix) {
        super();
        this.prefix = prefix;
        if (!client) {
            client = redis_1.default.createClient({
                url: process.env.REDIS_URL || "localhost",
            });
            getAsync = promisify(client.get).bind(client);
            putAsync = promisify(client.set).bind(client);
            redLock = new redlock_1.default([client], {
                retryCount: 1000,
                retryDelay: 500,
            });
        }
    }
    put(key, value) {
        return putAsync(`${this.prefix}/${key}`, JSON.stringify(value));
    }
    async get(key) {
        return JSON.parse(await getAsync(`${this.prefix}/${key}`));
    }
    async getAndLock(key) {
        const lockedResource = await redLock.lock(`${this.prefix}/${key}`, 1000);
        let value;
        try {
            value = JSON.parse(lockedResource.value);
        }
        catch (e) {
            value = null;
        }
        return {
            value,
            unlock: lockedResource.unlock.bind(lockedResource),
        };
    }
}
exports.RedisDriver = RedisDriver;
//# sourceMappingURL=redis-driver.js.map