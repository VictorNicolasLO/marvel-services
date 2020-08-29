import { DbDriver, DbDriverOptions, IDbsession } from "../db-drivers/db-driver";
import { Model } from "../model";
import { AppEventPublisher } from "../publishers/event.publisher";
export declare class GenericRepository<T extends Model<any>, IT> {
    driver: DbDriver<IT>;
    private eventPublisher;
    find: (filter: Partial<IT>) => Promise<T[]>;
    findById: (id: string, options?: DbDriverOptions) => Promise<T | null>;
    findOne: (filter: Partial<IT>, options?: DbDriverOptions) => Promise<T | null>;
    create: (dto: IT, options?: DbDriverOptions) => Promise<T>;
    update: (model: T, dto: Partial<IT>) => Promise<T>;
    delete: (model: T) => Promise<any>;
    persist: (model: T) => Promise<T>;
    transaction: () => Promise<IDbsession>;
    constructor(driver: DbDriver<IT>, RawModelClass: any, eventPublisher: AppEventPublisher);
}
