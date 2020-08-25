import { DbDriver } from '../db-drivers/db-driver';
import { Model } from '../model';
import { EventPublisher } from '@nestjs/cqrs';
export declare class GenericRepository<T extends Model<any>, IT> {
    driver: DbDriver<IT>;
    private eventPublisher;
    find: (filter: Partial<IT>) => Promise<T[]>;
    findById: (id: string) => Promise<T | null>;
    findOne: (filter: Partial<IT>) => Promise<T | null>;
    create: (dto: IT) => Promise<T>;
    update: (model: T, dto: Partial<IT>) => Promise<T>;
    delete: (model: T) => Promise<any>;
    persist: (model: T) => Promise<T>;
    constructor(driver: DbDriver<IT>, RawModelClass: any, eventPublisher: EventPublisher);
}
