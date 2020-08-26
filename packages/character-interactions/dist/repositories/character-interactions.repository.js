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
exports.CharacterInteractionsRepository = void 0;
const common_1 = require("@nestjs/common");
const infrastructure_1 = require("@marvel/infrastructure");
const character_interaction_model_1 = require("../models/character-interaction.model");
let CharacterInteractionsRepository = class CharacterInteractionsRepository extends infrastructure_1.GenericRepository {
    constructor(ep) {
        super(new infrastructure_1.MongoDriver("character-interactions"), character_interaction_model_1.CharacterInteractionModel, ep);
        this.ep = ep;
    }
};
CharacterInteractionsRepository = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [infrastructure_1.AppEventPublisher])
], CharacterInteractionsRepository);
exports.CharacterInteractionsRepository = CharacterInteractionsRepository;
//# sourceMappingURL=character-interactions.repository.js.map