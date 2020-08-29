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
const create_character_creator_command_1 = require("../impl/create-character-creator.command");
const character_creator_repository_1 = require("../../repositories/character-creator.repository");
const common_1 = require("@nestjs/common");
let CreateCharacterCreatorHandler = class CreateCharacterCreatorHandler {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(command) {
        const characterCreatorFound = await this.repository.findOne({
            characterId: command.characterCreatorDto.characterId,
            creatorId: command.characterCreatorDto.creatorId,
            role: command.characterCreatorDto.role,
        });
        console.log(characterCreatorFound);
        if (characterCreatorFound) {
            throw new common_1.BadRequestException("characterCreatorFound already exist");
        }
        const characterCreator = await this.repository.create(command.characterCreatorDto);
        return characterCreator.toDto();
    }
};
CreateCharacterCreatorHandler = __decorate([
    cqrs_1.CommandHandler(create_character_creator_command_1.CreateCharacterCreatorCommand),
    __metadata("design:paramtypes", [character_creator_repository_1.CharacterCreatorRepository])
], CreateCharacterCreatorHandler);
exports.CreateCharacterCreatorHandler = CreateCharacterCreatorHandler;
//# sourceMappingURL=create-character-creator.handler.js.map