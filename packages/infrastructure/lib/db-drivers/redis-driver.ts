import { KeyValueDbDriver } from "./db-driver";
import redis from "redis";
import RedLock from "redlock";
const { promisify } = require("util");
console.log(process.env.REDIS_URL);
let client: redis.RedisClient;
let getAsync: (arg0: string) => string | PromiseLike<string>;
let putAsync;
let redLock: RedLock;
export class RedisDriver<T> extends KeyValueDbDriver<T> {
  constructor(private prefix: string) {
    super();
    if (!client) {
      client = redis.createClient({
        url: process.env.REDIS_URL || "localhost",
      });
      getAsync = promisify(client.get).bind(client);
      putAsync = promisify(client.set).bind(client);
      redLock = new RedLock([client], {
        retryCount: 1000,
        retryDelay: 500,
      });
    }
  }

  put(key: string, value: Partial<T>): Promise<T> {
    return putAsync(`${this.prefix}/${key}`, JSON.stringify(value));
  }

  async get(key: string): Promise<T> {
    return JSON.parse(await getAsync(`${this.prefix}/${key}`));
  }

  async getAndLock(key: string) {
    const lockedResource = await redLock.lock(`${this.prefix}/${key}`, 1000);
    let value: any;
    try {
      value = JSON.parse(lockedResource.value);
    } catch (e) {
      value = null;
    }
    return {
      value,
      unlock: lockedResource.unlock.bind(lockedResource),
    };
  }
}
