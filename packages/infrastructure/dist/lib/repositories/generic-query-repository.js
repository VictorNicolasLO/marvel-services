"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericQueryRepository = void 0;
const uuid_1 = require("uuid");
class GenericQueryRepository {
    constructor(driver) {
        this.driver = driver;
        this.find = async (filter) => await driver.find(filter);
        this.findOne = async (filter) => await driver.findOne(filter);
        this.findById = async (id) => await driver.findById(id);
        this.create = async (dto) => {
            if (!dto.id)
                dto.id = uuid_1.v4();
            return await driver.insert(dto);
        };
        this.update = async (filter, dto) => await driver.update(filter, dto);
        this.delete = async (filter) => await driver.delete(filter);
    }
}
exports.GenericQueryRepository = GenericQueryRepository;
//# sourceMappingURL=generic-query-repository.js.map