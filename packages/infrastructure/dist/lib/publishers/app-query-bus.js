"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppQueryBus = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const kafka_1 = require("../brokers/kafka");
const PREFIX = process.env.BROKER_PREFIX || "";
let AppQueryBus = class AppQueryBus extends cqrs_1.QueryBus {
    constructor() {
        super(...arguments);
        this.groupIdPrefix = "";
    }
    set domainName(value) {
        new kafka_1.KafkaBroker({ groupId: this.groupIdPrefix + value }, true);
        this._domainName = value;
    }
    get domainName() {
        return this._domainName;
    }
    async execute(command) {
        const broker = new kafka_1.KafkaBroker({ groupId: this.groupIdPrefix + this.domainName }, true);
        const domainName = command.constructor.domainName;
        const commandName = command.constructor.name;
        try {
            const result = await broker.request(PREFIX + `queries.${domainName}.${commandName}`, { data: command }, 0);
            return result;
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async registerHandler(handler) {
        const instance = await this.moduleRef.resolve(handler);
        if (!instance) {
            return;
        }
        const target = this.reflectQueryName(handler);
        if (!target) {
            throw "INVALID QUERY";
        }
        this.bind(instance, target.name);
    }
    bind(handler, name) {
        const broker = new kafka_1.KafkaBroker({ groupId: this.groupIdPrefix + this.domainName }, true);
        broker.rpc(PREFIX + `queries.${this.domainName}.${name}`, (msg) => new Promise(async (resolve, reject) => {
            try {
                const result = await handler.execute(msg.data);
                resolve(result);
            }
            catch (e) {
                common_1.Logger.error(e.message, e.trace, "RPC consumer reponse");
                reject(e);
                throw e;
            }
        }));
    }
};
AppQueryBus = __decorate([
    common_1.Injectable()
], AppQueryBus);
exports.AppQueryBus = AppQueryBus;
//# sourceMappingURL=app-query-bus.js.map