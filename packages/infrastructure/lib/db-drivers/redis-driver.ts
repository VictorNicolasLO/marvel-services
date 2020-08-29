import { KeyValueDbDriver } from "./db-driver";
import redis, { RedisClient } from "redis";
import { delay } from "../../utils/delay";
import { RequestTimeoutException } from "@nestjs/common";
const { promisify } = require("util");
console.log(process.env.REDIS_URL);

const LOCK_TIMEOUT = 1000;
const RETRY_DURATION = 100;
const RETRY_LIMIT = 1000;
export class RedisDriver<T> extends KeyValueDbDriver<T> {
  static client: RedisClient;
  static getAsync: (arg0: string) => string | PromiseLike<string | number>;
  static putAsync: (arg0: string, arg1: string) => Promise<any>;
  static setnxAsync: (arg0: string, arg1: number | string) => Promise<number>;
  static getsetAsync: (arg0: string, arg1: number | string) => Promise<any>;

  constructor(private prefix: string) {
    super();
    if (!RedisDriver.client) {
      RedisDriver.client = redis.createClient({
        url: process.env.REDIS_URL || "localhost",
      });
      RedisDriver.getAsync = promisify(RedisDriver.client.get).bind(
        RedisDriver.client
      );
      RedisDriver.putAsync = promisify(RedisDriver.client.set).bind(
        RedisDriver.client
      );
      RedisDriver.putAsync = promisify(RedisDriver.client.set).bind(
        RedisDriver.client
      );
      RedisDriver.setnxAsync = promisify(RedisDriver.client.setnx).bind(
        RedisDriver.client
      );
      RedisDriver.getsetAsync = promisify(RedisDriver.client.getset).bind(
        RedisDriver.client
      );
    }
  }

  put(key: string, value: Partial<T>): Promise<T> {
    return RedisDriver.putAsync(`${this.prefix}/${key}`, JSON.stringify(value));
  }

  async get(key: string): Promise<T> {
    return JSON.parse(
      (await RedisDriver.getAsync(`${this.prefix}/${key}`)) as string
    );
  }

  async getAndLock(key: string) {
    const lockKey = `lock.${this.prefix}/${key}`;
    const now = Date.now();

    const checkLock = async () => {
      const isLockedNx =
        (await RedisDriver.setnxAsync(lockKey, now + LOCK_TIMEOUT + 1)) === 0;
      if (!isLockedNx) {
        return true;
      }
      const timeout = await RedisDriver.getAsync(lockKey);
      if (now > timeout) {
        const newtimeout = await RedisDriver.getsetAsync(
          lockKey,
          now + LOCK_TIMEOUT + 1
        );
        if (newtimeout !== timeout) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    };

    const getData = async () => {
      return {
        value: await this.get(key),
        unlock: () => {
          return RedisDriver.putAsync(lockKey, "");
        },
      };
    };

    const isLocked = await checkLock();

    if (!isLocked) {
      return await getData();
    } else {
      let retryIntents = 0;
      do {
        await delay(RETRY_DURATION);
        const isLocked = await checkLock();
        if (!isLocked) {
          return await getData();
        }
        retryIntents++;
      } while (retryIntents <= RETRY_LIMIT);
      throw new RequestTimeoutException("Redis lock retry limit exceded");
    }
  }
}
