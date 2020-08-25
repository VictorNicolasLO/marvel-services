import { KeyValueDbDriver } from "./db-driver";
import redis from 'redis'
const { promisify } = require("util");

const client = redis.createClient({
  url: process.env.REDIS_URL || "localhost"
})

const getAsync = promisify(client.get).bind(client);
const putAsync = promisify(client.set).bind(client);

export class RedisDriver<T> extends KeyValueDbDriver<T> {

  constructor(private prefix: string) {
    super();
  }

  put(key: string, value: Partial<T>): Promise<T> {
    return putAsync(`${this.prefix}/${key}`, JSON.stringify(value))
  }
  async get(key: string): Promise<T> {
    return JSON.parse(await getAsync(`${this.prefix}/${key}`))
  }

}
