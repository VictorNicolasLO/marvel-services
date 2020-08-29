import { KeyValueDbDriver } from "./db-driver";
import { RedisClient } from "redis";
export declare class RedisDriver<T> extends KeyValueDbDriver<T> {
    private prefix;
    static client: RedisClient;
    static getAsync: (arg0: string) => string | PromiseLike<string | number>;
    static putAsync: (arg0: string, arg1: string) => Promise<any>;
    static setnxAsync: (arg0: string, arg1: number | string) => Promise<number>;
    static getsetAsync: (arg0: string, arg1: number | string) => Promise<any>;
    constructor(prefix: string);
    put(key: string, value: Partial<T>): Promise<T>;
    get(key: string): Promise<T>;
    getAndLock(key: string): Promise<{
        value: T;
        unlock: () => Promise<any>;
    }>;
}
