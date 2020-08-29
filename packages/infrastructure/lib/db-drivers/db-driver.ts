export interface IDbsession {
  abortTransaction: () => Promise<void>;
  commitTransaction: () => Promise<void>;
  endSession: () => Promise<void>;
  startTransaction: () => Promise<void>;
}

export type DbDriverOptions = { session?: IDbsession };

export abstract class DbDriver<T> {
  abstract async findOne(
    filter: Partial<T>,
    options?: DbDriverOptions
  ): Promise<T | null>;
  abstract async findById(
    id: string,
    options?: DbDriverOptions
  ): Promise<T | null>;
  abstract async find(
    filter: Partial<T>,
    options?: DbDriverOptions
  ): Promise<T[]>;
  abstract async insert(data: T, options?: DbDriverOptions): Promise<T>;
  abstract async update(
    filter: Partial<T>,
    data: T,
    options?: DbDriverOptions
  ): Promise<T>;
  abstract async delete(
    filter: Partial<T>,
    options?: DbDriverOptions
  ): Promise<T>;
  abstract async transaction(): Promise<IDbsession>;
}

export abstract class KeyValueDbDriver<T> {
  abstract async put(key: string, value: Partial<T>): Promise<T | null>;
  abstract async get(key: string): Promise<T | null>;
  abstract async getAndLock(
    key: string
  ): Promise<{ value: T; unlock: () => Promise<any> } | null>;
}
