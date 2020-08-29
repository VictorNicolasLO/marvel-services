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
const cqrs_1 = require("@nestjs/cqrs");
const infrastructure_1 = require("@marvel/infrastructure");
const character_interactions_1 = require("@marvel/character-interactions");
const read_character_interactions_repository_1 = require("./repositories/read-character-interactions.repository");
const character_interaction_created_handler_1 = require("./events/character-interaction-created.handler");
const get_character_interaction_handler_1 = require("./queries/handlers/get-character-interaction.handler");
let SearchCharacterInteractionModule = class SearchCharacterInteractionModule {
    constructor(query$, event$, eventPublisher) {
        this.query$ = query$;
        this.event$ = event$;
        this.eventPublisher = eventPublisher;
    }
    onModuleInit() {
        this.event$.register([character_interaction_created_handler_1.CharacterInteractionCreatedHandler]);
        this.eventPublisher.groupIdPrefix = "v2";
        this.eventPublisher.setDomainName("search-character-interactions");
        this.eventPublisher.registerEvents([character_interactions_1.CharacterInteractionCreatedEvent]);
        this.eventPublisher.bridgeEventsTo(this.event$.subject$);
        this.event$.publisher = this.eventPublisher;
        this.query$.domainName = "search-character-interactions";
        this.query$.register([get_character_interaction_handler_1.GetCharacterInteractionByNameHandler]);
    }
};
SearchCharacterInteractionModule = __decorate([
    common_1.Module({
        imports: [cqrs_1.CqrsModule],
        providers: [
            read_character_interactions_repository_1.ReadCharacterInteractionsRepository,
            infrastructure_1.AppEventPublisher,
            infrastructure_1.AppQueryBus,
            character_interaction_created_handler_1.CharacterInteractionCreatedHandler,
            get_character_interaction_handler_1.GetCharacterInteractionByNameHandler,
            infrastructure_1.AppEventBus,
        ],
    }),
    __metadata("design:paramtypes", [infrastructure_1.AppQueryBus,
        infrastructure_1.AppEventBus,
        infrastructure_1.AppEventPublisher])
], SearchCharacterInteractionModule);
exports.SearchCharacterInteractionModule = SearchCharacterInteractionModule;
//# sourceMappingURL=search-character-interaction.module.js.map