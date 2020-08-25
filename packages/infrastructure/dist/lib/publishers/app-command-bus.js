"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCommandBus = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const kafka_1 = require("../brokers/kafka");
const PREFIX = process.env.BROKER_PREFIX || "";
let AppCommandBus = class AppCommandBus extends cqrs_1.CommandBus {
    constructor(moduleRef) {
        super(moduleRef);
    }
    set domainName(value) {
        new kafka_1.KafkaBroker({ groupId: value }, true);
        this._domainName = value;
    }
    get domainName() {
        return this._domainName;
    }
    async execute(command) {
        console.log(this.domainName);
        const broker = new kafka_1.KafkaBroker({ groupId: this.domainName }, true);
        const domainName = command.constructor.domainName;
        const commandName = command.constructor.name;
        try {
            const result = await broker.request(PREFIX + `commands.${domainName}.${commandName}`, { data: command });
            return result;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, e.status);
        }
    }
    bind(handler, name) {
        const broker = new kafka_1.KafkaBroker({ groupId: this.domainName }, true);
        broker.rpc(PREFIX + `commands.${this.domainName}.${name}`, (msg) => new Promise(async (resolve, reject) => {
            try {
                const result = await handler.execute(msg.data);
                resolve(result);
            }
            catch (e) {
                common_1.Logger.error(e.message, e.trace, 'RPC consumer reponse');
                reject(e);
                throw e;
            }
        }));
    }
    async registerHandler(handler) {
        const instance = await this.moduleRef.resolve(handler);
        if (!instance) {
            return;
        }
        const target = this.reflectCommandName(handler);
        if (!target) {
            throw 'INVALID COMMAND TYPE';
        }
        this.bind(instance, target.name);
    }
};
AppCommandBus = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.ModuleRef])
], AppCommandBus);
exports.AppCommandBus = AppCommandBus;
//# sourceMappingURL=app-command-bus.js.map