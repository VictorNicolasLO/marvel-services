"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDriver = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const db_driver_1 = require("./db-driver");
class MongoDriver extends db_driver_1.DbDriver {
    constructor(collection) {
        super();
        const customSchema = new mongoose_1.Schema({
            id: { String, unique: true, index: true },
        }, {
            strict: false,
            id: false,
        });
        this.collection = mongoose_1.default.model(collection, customSchema);
    }
    static init(url) {
        mongoose_1.default
            .connect(url, (err) => {
            if (!err) {
                console.log("MONGO RUNNING");
            }
            else {
                console.log(err);
            }
        })
            .then((db) => {
            MongoDriver.db = db;
        });
    }
    async findOne(filter, options = {}) {
        const operation = this.collection.findOne(filter);
        const result = await (options.session
            ? operation.session(options.session)
            : operation);
        return result && result.toObject();
    }
    async findById(id, options = {}) {
        const operation = this.collection.findOne({ id });
        const result = await (options.session
            ? operation.session(options.session)
            : operation);
        return result && result.toObject();
    }
    async find(filter) {
        return (await this.collection.find(filter)).map((item) => item.toObject());
    }
    async insert(data, options = {}) {
        return (await this.collection.create(data, options));
    }
    async update(filter, data) {
        return await this.collection.update(filter, data);
    }
    async delete(data) {
        return await this.collection.deleteOne(data.id);
    }
    async transaction() {
        const session = await MongoDriver.db.startSession();
        return session;
    }
}
exports.MongoDriver = MongoDriver;
//# sourceMappingURL=mongo-driver.js.map