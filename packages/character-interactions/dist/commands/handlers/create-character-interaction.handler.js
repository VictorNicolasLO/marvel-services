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
const cqrs_1 = require("@nestjs/cqrs");
const create_character_interaction_command_1 = require("../impl/create-character-interaction.command");
const character_interactions_repository_1 = require("../../repositories/character-interactions.repository");
let CreateCharacterInteractionHandler = class CreateCharacterInteractionHandler {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(command) {
        const characterInteraction = await this.repository.create(command.characterInteractionDto);
        return characterInteraction.toDto();
    }
};
CreateCharacterInteractionHandler = __decorate([
    cqrs_1.CommandHandler(create_character_interaction_command_1.CreateCharacterInteractionCommand),
    __metadata("design:paramtypes", [character_interactions_repository_1.CharacterInteractionsRepository])
], CreateCharacterInteractionHandler);
exports.CreateCharacterInteractionHandler = CreateCharacterInteractionHandler;
//# sourceMappingURL=create-character-interaction.handler.js.map