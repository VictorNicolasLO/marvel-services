"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericRepository = void 0;
class GenericRepository {
    constructor(driver, RawModelClass, eventPublisher) {
        this.driver = driver;
        this.eventPublisher = eventPublisher;
        const ModelClass = this.eventPublisher.mergeClassContext(RawModelClass);
        this.find = async (filter) => (await driver.find(filter)).map((obj) => new ModelClass(obj, { isInRepository: true }));
        this.findOne = async (filter, options) => {
            const dto = await driver.findOne(filter, options);
            if (dto) {
                return new ModelClass(dto, { isInRepository: true });
            }
            else
                return null;
        };
        this.findById = async (id, options) => {
            const dto = await driver.findById(id, options);
            if (dto)
                return new ModelClass(dto, { isInRepository: true });
            else
                return null;
        };
        this.create = async (dto, options) => {
            const model = new ModelClass(dto);
            if (model.create)
                model.create();
            await driver.insert(model.toDto(), options);
            model.commit();
            model.__isInRepository = true;
            return model;
        };
        this.update = async (model, dto) => {
            if (model.update)
                model.update(dto);
            await driver.update({ id: model.id }, dto);
            model.commit();
            return model;
        };
        this.delete = async (model) => {
            if (model.delete)
                model.delete();
            const result = await driver.delete({ id: model.id });
            model.commit();
            return result;
        };
        this.persist = async (model) => {
            if (model.__isInRepository)
                await driver.update({ id: model.id }, model.toDto());
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
exports.GenericRepository = GenericRepository;
//# sourceMappingURL=generic-repository.js.map