"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericQueryKeyValueRepository = void 0;
class GenericQueryKeyValueRepository {
    constructor(driver) {
        this.driver = driver;
    }
    async put(key, dto) {
        return await this.driver.put(key, dto);
    }
    async get(key) {
        return await this.driver.get(key);
    }
}
exports.GenericQueryKeyValueRepository = GenericQueryKeyValueRepository;
//# sourceMappingURL=generic-query-key-value-repository.js.map