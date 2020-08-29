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
exports.AppEventBus = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const app_command_bus_1 = require("./app-command-bus");
const core_1 = require("@nestjs/core");
let AppEventBus = class AppEventBus extends cqrs_1.EventBus {
    constructor(commandBus, moduleRef) {
        super(commandBus, moduleRef);
    }
    bind(handler, name) {
        const stream$ = name ? this.ofEventName(name) : this.subject$;
        const subscription = stream$.subscribe(async (event) => {
            try {
                event.__promise.resolve(await handler.handle(event));
            }
            catch (e) {
                event.__promise.reject(e);
            }
        });
        this.subscriptions.push(subscription);
    }
    publish(event) {
        this.publisher.publish(event);
    }
};
AppEventBus = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [app_command_bus_1.AppCommandBus, core_1.ModuleRef])
], AppEventBus);
exports.AppEventBus = AppEventBus;
//# sourceMappingURL=app-event-bus.js.map