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
const common_1 = require("@nestjs/common");
const characters_controller_1 = require("./controllers/characters.controller");
const collaborators_controller_1 = require("./controllers/collaborators.controller");
const infrastructure_1 = require("@marvel/infrastructure");
let WebGatewayModule = class WebGatewayModule {
    constructor(command$, appQueryBus) {
        this.command$ = command$;
        this.appQueryBus = appQueryBus;
        this.command$.domainName = "web-gateway";
        this.appQueryBus.domainName = "web-gateway";
    }
};
WebGatewayModule = __decorate([
    common_1.Module({
        controllers: [characters_controller_1.CharactersController, collaborators_controller_1.CollaboratorsController],
        providers: [infrastructure_1.AppCommandBus, infrastructure_1.AppQueryBus],
    }),
    __metadata("design:paramtypes", [infrastructure_1.AppCommandBus,
        infrastructure_1.AppQueryBus])
], WebGatewayModule);
exports.WebGatewayModule = WebGatewayModule;
//# sourceMappingURL=web-gateway.module.js.map