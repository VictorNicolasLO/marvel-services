export interface IDbsession {
    abortTransaction: () => Promise<void>;
    commitTransaction: () => Promise<void>;
    endSession: () => Promise<void>;
    startTransaction: () => Promise<void>;
}
export declare type DbDriverOptions = {
    session?: IDbsession;
};
export declare abstract class DbDriver<T> {
    abstract findOne(filter: Partial<T>, options?: DbDriverOptions): Promise<T | null>;
    abstract findById(id: string, options?: DbDriverOptions): Promise<T | null>;
    abstract find(filter: Partial<T>, options?: DbDriverOptions): Promise<T[]>;
    abstract insert(data: T, options?: DbDriverOptions): Promise<T>;
    abstract update(filter: Partial<T>, data: T, options?: DbDriverOptions): Promise<T>;
    abstract delete(filter: Partial<T>, options?: DbDriverOptions): Promise<T>;
    abstract transaction(): Promise<IDbsession>;
}
export declare abstract class KeyValueDbDriver<T> {
    abstract put(key: string, value: Partial<T>): Promise<T | null>;
    abstract get(key: string): Promise<T | null>;
    abstract getAndLock(key: string): Promise<{
        value: T;
        unlock: () => Promise<any>;
    } | null>;
}
