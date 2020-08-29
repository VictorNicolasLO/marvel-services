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
exports.SearchCharacterInteractionModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const infrastructure_1 = require("@marvel/infrastructure");
const character_creators_1 = require("@marvel/character-creators");
const read_character_creator_repository_1 = require("./repositories/read-character-creator.repository");
const character_creator_created_handler_1 = require("./events/character-creator-created.handler");
const get_character_creator_handler_1 = require("./queries/handlers/get-character-creator.handler");
let SearchCharacterInteractionModule = class SearchCharacterInteractionModule {
    constructor(query$, event$, eventPublisher) {
        this.query$ = query$;
        this.event$ = event$;
        this.eventPublisher = eventPublisher;
    }
    onModuleInit() {
        this.event$.register([character_creator_created_handler_1.CharacterCreatorCreatedHandler]);
        this.eventPublisher.groupIdPrefix = "v2";
        this.eventPublisher.setDomainName("search-character-creators");
        this.eventPublisher.registerEvents([character_creators_1.CharacterCreatorCreatedEvent]);
        this.eventPublisher.bridgeEventsTo(this.event$.subject$);
        this.event$.publisher = this.eventPublisher;
        this.query$.domainName = "search-character-creators";
        this.query$.register([get_character_creator_handler_1.GetCharacterCreatorByNameHandler]);
    }
};
SearchCharacterInteractionModule = __decorate([
    common_1.Module({
        imports: [cqrs_1.CqrsModule],
        providers: [
            read_character_creator_repository_1.ReadCharacterCreatorRepository,
            infrastructure_1.AppEventPublisher,
            infrastructure_1.AppQueryBus,
            character_creator_created_handler_1.CharacterCreatorCreatedHandler,
            get_character_creator_handler_1.GetCharacterCreatorByNameHandler,
            infrastructure_1.AppEventBus,
        ],
    }),
    __metadata("design:paramtypes", [infrastructure_1.AppQueryBus,
        infrastructure_1.AppEventBus,
        infrastructure_1.AppEventPublisher])
], SearchCharacterInteractionModule);
exports.SearchCharacterInteractionModule = SearchCharacterInteractionModule;
//# sourceMappingURL=search-character-creators.module.js.map