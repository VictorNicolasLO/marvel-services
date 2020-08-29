import { DbDriver, DbDriverOptions, IDbsession } from "../db-drivers/db-driver";
import { Model } from "../model";
import { AppEventPublisher } from "../publishers/event.publisher";

export class GenericRepository<T extends Model<any>, IT> {
  find: (filter: Partial<IT>) => Promise<T[]>;
  findById: (id: string, options?: DbDriverOptions) => Promise<T | null>;
  findOne: (
    filter: Partial<IT>,
    options?: DbDriverOptions
  ) => Promise<T | null>;
  create: (dto: IT, options?: DbDriverOptions) => Promise<T>;
  update: (model: T, dto: Partial<IT>) => Promise<T>;
  delete: (model: T) => Promise<any>;
  persist: (model: T) => Promise<T>;
  transaction: () => Promise<IDbsession>;
  constructor(
    public driver: DbDriver<IT>,
    RawModelClass: any,
    private eventPublisher: AppEventPublisher
  ) {
    const ModelClass = this.eventPublisher.mergeClassContext(RawModelClass);
    this.find = async (filter) =>
      (await driver.find(filter as any)).map(
        (obj) => new ModelClass(obj, { isInRepository: true })
      );

    this.findOne = async (filter, options?: DbDriverOptions) => {
      const dto = await driver.findOne(filter as any, options);
      if (dto) {
        return new ModelClass(dto, { isInRepository: true });
      } else return null;
    };

    this.findById = async (id, options?: DbDriverOptions) => {
      const dto = await driver.findById(id, options);
      if (dto) return new ModelClass(dto, { isInRepository: true });
      else return null;
    };

    this.create = async (dto, options?: DbDriverOptions) => {
      const model = new ModelClass(dto);
      if (model.create) model.create();
      await driver.insert(model.toDto(), options);
      model.commit();
      model.__isInRepository = true;
      return model;
    };

    this.update = async (model, dto) => {
      if (model.update) model.update(dto);
      await driver.update({ id: model.id } as any, dto as any);
      model.commit();
      return model;
    };

    this.delete = async (model) => {
      if (model.delete) model.delete();
      const result = await driver.delete({ id: model.id } as any);
      model.commit();
      return result;
    };

    this.persist = async (model: T) => {
      if (model.__isInRepository)
        await driver.update({ id: model.id } as any, model.toDto());
      else {
        await driver.insert(model.toDto());
        model.__isInRepository = true;
      }
      model.commit();
      return model;
    };

    this.transaction = this.driver.transaction;
  }
}
