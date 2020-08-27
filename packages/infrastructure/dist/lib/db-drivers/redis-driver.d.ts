import { KeyValueDbDriver } from "./db-driver";
export declare class RedisDriver<T> extends KeyValueDbDriver<T> {
    private prefix;
    constructor(prefix: string);
    put(key: string, value: Partial<T>): Promise<T>;
    get(key: string): Promise<T>;
    getAndLock(key: string): Promise<{
        value: any;
        unlock: any;
    }>;
}
