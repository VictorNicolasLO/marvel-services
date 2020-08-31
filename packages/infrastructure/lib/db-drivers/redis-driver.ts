import { KeyValueDbDriver } from "./db-driver";
import redis, { RedisClient } from "redis";
import { delay } from "../../utils/delay";
import { RequestTimeoutException } from "@nestjs/common";
const { promisify } = require("util");

const LOCK_TIMEOUT = 15000;
const RETRY_DURATION = 100;
const RETRY_LIMIT = 1000;
export class RedisDriver<T> extends KeyValueDbDriver<T> {
  static client: RedisClient;
  static getAsync: (arg0: string) => string | PromiseLike<string>;
  static putAsync: (arg0: string, arg1: string) => Promise<any>;
  static setnxAsync: (arg0: string, arg1: number | string) => Promise<string>;
  static getsetAsync: (arg0: string, arg1: number | string) => Promise<string>;
  static delAsync: (arg0: string) => Promise<string>;

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
      RedisDriver.delAsync = promisify(RedisDriver.client.del).bind(
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
    const checkLock = async () => {
      const nxValue = parseInt(
        await RedisDriver.setnxAsync(lockKey, Date.now() + LOCK_TIMEOUT + 1)
      );
      if (nxValue == 1) {
        return false;
      }

      const timeOutString = await RedisDriver.getAsync(lockKey);
      const timeout = parseInt(timeOutString ? timeOutString : "0");
      if (Date.now() > timeout) {
        const newtimeoutString = await RedisDriver.getsetAsync(
          lockKey,
          Date.now() + LOCK_TIMEOUT + 1
        );
        const newtimeout = parseInt(newtimeoutString ? timeOutString : "0");
        if (newtimeout > timeout) {
          return true;
        }
        return false;
      } else {
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
