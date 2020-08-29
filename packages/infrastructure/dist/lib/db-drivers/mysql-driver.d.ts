import { DbDriver } from "./db-driver";
export declare class MysqlDriver<T> extends DbDriver<T> {
    transaction(): Promise<any>;
    findOne(filter: Partial<T>): Promise<T>;
    findById(id: string): Promise<T>;
    find(filter: Partial<T>): Promise<T[]>;
    insert(data: T): Promise<T>;
    update(filter: any, data: T): Promise<T>;
    delete(filter: any): Promise<T>;
}
