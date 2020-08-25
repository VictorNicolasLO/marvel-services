import { DbDriver } from '../db-drivers/db-driver';
export declare class GenericReadRepository<T> {
    driver: DbDriver<T>;
    find: (filter: Partial<T>) => Promise<T[] | []>;
    findById: (id: string) => Promise<T | null>;
    findOne: (filter: Partial<T>) => Promise<T | null>;
    create: (dto: T) => Promise<T>;
    update: (filter: Partial<T>, dto: Partial<T>) => Promise<T>;
    delete: (filter: Partial<T>) => Promise<any>;
    constructor(driver: DbDriver<T>);
}
