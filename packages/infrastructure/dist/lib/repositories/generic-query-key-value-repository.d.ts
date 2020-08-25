import { KeyValueDbDriver } from '../db-drivers/db-driver';
export declare class GenericQueryKeyValueRepository<T> {
    driver: KeyValueDbDriver<T>;
    constructor(driver: KeyValueDbDriver<T>);
    put(key: string, dto: T): Promise<T>;
    get(key: string): Promise<T>;
}
