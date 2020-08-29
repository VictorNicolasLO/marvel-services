"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisDriver = void 0;
const db_driver_1 = require("./db-driver");
const redis_1 = __importDefault(require("redis"));
const delay_1 = require("../../utils/delay");
const common_1 = require("@nestjs/common");
const { promisify } = require("util");
console.log(process.env.REDIS_URL);
const LOCK_TIMEOUT = 15000;
const RETRY_DURATION = 100;
const RETRY_LIMIT = 1000;
class RedisDriver extends db_driver_1.KeyValueDbDriver {
    constructor(prefix) {
        super();
        this.prefix = prefix;
        if (!RedisDriver.client) {
            RedisDriver.client = redis_1.default.createClient({
                url: process.env.REDIS_URL || "localhost",
            });
            RedisDriver.getAsync = promisify(RedisDriver.client.get).bind(RedisDriver.client);
            RedisDriver.putAsync = promisify(RedisDriver.client.set).bind(RedisDriver.client);
            RedisDriver.putAsync = promisify(RedisDriver.client.set).bind(RedisDriver.client);
            RedisDriver.setnxAsync = promisify(RedisDriver.client.setnx).bind(RedisDriver.client);
            RedisDriver.getsetAsync = promisify(RedisDriver.client.getset).bind(RedisDriver.client);
            RedisDriver.delAsync = promisify(RedisDriver.client.del).bind(RedisDriver.client);
        }
    }
    put(key, value) {
        return RedisDriver.putAsync(`${this.prefix}/${key}`, JSON.stringify(value));
    }
    async get(key) {
        return JSON.parse((await RedisDriver.getAsync(`${this.prefix}/${key}`)));
    }
    async getAndLock(key) {
        const lockKey = `lock.${this.prefix}/${key}`;
        const checkLock = async () => {
            const nxValue = parseInt(await RedisDriver.setnxAsync(lockKey, Date.now() + LOCK_TIMEOUT + 1));
            if (nxValue == 1) {
                return false;
            }
            const timeOutString = await RedisDriver.getAsync(lockKey);
            const timeout = parseInt(timeOutString ? timeOutString : "0");
            if (Date.now() > timeout) {
                const newtimeoutString = await RedisDriver.getsetAsync(lockKey, Date.now() + LOCK_TIMEOUT + 1);
                const newtimeout = parseInt(newtimeoutString ? timeOutString : "0");
                if (newtimeout > timeout) {
                    return true;
                }
                return false;
            }
            else {
                return true;
            }
        };
        const getData = async () => {
            return {
                value: await this.get(key),
                unlock: () => {
                    return RedisDriver.delAsync(lockKey);
                },
            };
        };
        const isLocked = await checkLock();
        if (!isLocked) {
            return await getData();
        }
        else {
            let retryIntents = 0;
            do {
                await delay_1.delay(RETRY_DURATION);
                const isLocked = await checkLock();
                if (!isLocked) {
                    return await getData();
                }
                retryIntents++;
            } while (retryIntents <= RETRY_LIMIT);
            throw new common_1.RequestTimeoutException("Redis lock retry limit exceded");
        }
    }
}
exports.RedisDriver = RedisDriver;
//# sourceMappingURL=redis-driver.js.map