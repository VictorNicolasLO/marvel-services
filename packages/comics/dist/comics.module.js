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
const comics_repository_1 = require("./repositories/comics.repository");
const cqrs_1 = require("@nestjs/cqrs");
const infrastructure_1 = require("@marvel/infrastructure");
const create_comic_handler_1 = require("./commands/handlers/create-comic.handler");
let ComicsModule = class ComicsModule {
    constructor(command$, event$, eventPublisher) {
        this.command$ = command$;
        this.event$ = event$;
        this.eventPublisher = eventPublisher;
    }
    onModuleInit() {
        this.eventPublisher.setDomainName("comics");
        this.eventPublisher.registerEvents([]);
        this.eventPublisher.bridgeEventsTo(this.event$.subject$);
        this.event$.publisher = this.eventPublisher;
        this.command$.domainName = "comics";
        this.command$.register([create_comic_handler_1.CreateComicHandler]);
    }
};
ComicsModule = __decorate([
    common_1.Module({
        imports: [cqrs_1.CqrsModule],
        providers: [
            comics_repository_1.ComicsRepository,
            infrastructure_1.AppEventPublisher,
            create_comic_handler_1.CreateComicHandler,
            infrastructure_1.AppCommandBus,
        ],
    }),
    __metadata("design:paramtypes", [infrastructure_1.AppCommandBus,
        cqrs_1.EventBus,
        infrastructure_1.AppEventPublisher])
], ComicsModule);
exports.ComicsModule = ComicsModule;
//# sourceMappingURL=comics.module.js.map