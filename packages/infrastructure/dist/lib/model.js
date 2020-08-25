"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const uuid_1 = require("uuid");
const asserts_1 = require("./asserts");
const assert_1 = __importDefault(require("assert"));
const common_1 = require("@nestjs/common");
class Model extends cqrs_1.AggregateRoot {
    constructor(dto, options = { isInRepository: false }) {
        super();
        this.__isInRepository = false;
        this.__isInRepository = options.isInRepository;
        if (!dto.id)
            dto.id = uuid_1.v4();
        this.fromDto(dto);
    }
    set id(value) {
        assert_1.default(value, 'Id is required for user creation');
        asserts_1.assertString(value, 'Id must be string');
        if (this._id) {
            throw new common_1.ConflictException('this model already has an id');
        }
        this._id = value;
    }
    get id() {
        return this._id;
    }
    fromDto(dto) {
        Object.keys(dto).forEach(dtoKey => {
            if (!dtoKey.startsWith('_'))
                this[dtoKey] = dto[dtoKey];
        });
    }
    toDto() {
        const dto = {};
        Object.getOwnPropertyNames(this).forEach(modelKey => {
            if (modelKey.startsWith('_') && modelKey !== '__isInRepository')
                dto[modelKey.substring(1)] = this[modelKey];
        });
        return dto;
    }
    updateModel(data) {
        this.fromDto(data);
    }
    toObject() {
        return this.toDto();
    }
}
exports.Model = Model;
//# sourceMappingURL=model.js.map