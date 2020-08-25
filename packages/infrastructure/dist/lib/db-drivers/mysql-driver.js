"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlDriver = void 0;
const db_driver_1 = require("./db-driver");
class MysqlDriver extends db_driver_1.DbDriver {
    findOne(filter) {
        throw new Error('Method not implemented.');
    }
    findById(id) {
        throw new Error('Method not implemented.');
    }
    find(filter) {
        throw new Error('Method not implemented.');
    }
    insert(data) {
        throw new Error('Method not implemented.');
    }
    update(filter, data) {
        throw new Error('Method not implemented.');
    }
    delete(filter) {
        throw new Error('Method not implemented.');
    }
}
exports.MysqlDriver = MysqlDriver;
//# sourceMappingURL=mysql-driver.js.map