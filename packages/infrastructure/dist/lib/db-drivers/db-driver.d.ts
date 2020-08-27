export declare abstract class DbDriver<T> {
    abstract findOne(filter: Partial<T>): Promise<T | null>;
    abstract findById(id: string): Promise<T | null>;
    abstract find(filter: Partial<T>): Promise<T[]>;
    abstract insert(data: T): Promise<T>;
    abstract update(filter: Partial<T>, data: T): Promise<T>;
    abstract delete(filter: Partial<T>): Promise<T>;
}
export declare abstract class KeyValueDbDriver<T> {
    abstract put(key: string, value: Partial<T>): Promise<T | null>;
    abstract get(key: string): Promise<T | null>;
    abstract getAndLock(key: string): Promise<{
        value: T;
        unlock: () => Promise<any>;
    } | null>;
}
