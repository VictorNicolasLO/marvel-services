import { Model, Document } from 'mongoose';
import { DbDriver } from './db-driver';
export declare class MongoDriver<T> extends DbDriver<T> {
    collection: Model<Document>;
    constructor(collection: string);
    static init(url: string): void;
    findOne(filter: Partial<T>): Promise<T | null>;
    find(filter: Partial<T>): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    insert(data: T): Promise<T>;
    update(filter: Partial<T>, data: Partial<T>): Promise<T>;
    delete(data: Partial<T>): Promise<any>;
}
