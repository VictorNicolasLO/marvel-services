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
const character_interactions_repository_1 = require("./repositories/character-interactions.repository");
const cqrs_1 = require("@nestjs/cqrs");
const infrastructure_1 = require("@marvel/infrastructure");
const create_character_interaction_handler_1 = require("./commands/handlers/create-character-interaction.handler");
const comics_1 = require("@marvel/comics");
const comics_saga_1 = require("./sagas/comics.saga");
const DOMAIN_NAME = "character-interactions";
const SUBFIX = "v4";
let CharacterInteractionModule = class CharacterInteractionModule {
    constructor(command$, event$, eventPublisher) {
        this.command$ = command$;
        this.event$ = event$;
        this.eventPublisher = eventPublisher;
    }
    onModuleInit() {
        this.eventPublisher.groupIdPrefix = SUBFIX;
        this.eventPublisher.setDomainName(DOMAIN_NAME);
        this.eventPublisher.registerEvents([comics_1.ComicCreatedEventDomain]);
        this.eventPublisher.bridgeEventsTo(this.event$.subject$);
        this.event$.publisher = this.eventPublisher;
        this.event$.registerSagas([comics_saga_1.ComicsSaga]);
        this.command$.domainName = DOMAIN_NAME;
        this.command$.register([create_character_interaction_handler_1.CreateCharacterInteractionHandler]);
    }
};
CharacterInteractionModule = __decorate([
    common_1.Module({
        imports: [cqrs_1.CqrsModule],
        providers: [
            character_interactions_repository_1.CharacterInteractionsRepository,
            infrastructure_1.AppEventPublisher,
            infrastructure_1.AppCommandBus,
            create_character_interaction_handler_1.CreateCharacterInteractionHandler,
            comics_saga_1.ComicsSaga,
            infrastructure_1.AppEventBus,
        ],
    }),
    __metadata("design:paramtypes", [infrastructure_1.AppCommandBus,
        infrastructure_1.AppEventBus,
        infrastructure_1.AppEventPublisher])
], CharacterInteractionModule);
exports.CharacterInteractionModule = CharacterInteractionModule;
//# sourceMappingURL=character-interaction.module.js.map