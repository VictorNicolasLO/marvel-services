import mongoose, { Model, Document } from "mongoose";
import { DbDriver, DbDriverOptions, IDbsession } from "./db-driver";
export declare class MongoDriver<T> extends DbDriver<T> {
    collection: Model<Document>;
    constructor(collection: string);
    static db: typeof mongoose;
    static init(url: string): void;
    findOne(filter: Partial<T>, options?: DbDriverOptions): Promise<T | null>;
    findById(id: string, options?: DbDriverOptions): Promise<T | null>;
    find(filter: Partial<T>): Promise<T[]>;
    insert(data: T, options: DbDriverOptions): Promise<T>;
    update(filter: Partial<T>, data: Partial<T>): Promise<T>;
    delete(data: Partial<T>): Promise<any>;
    transaction(): Promise<IDbsession>;
}
