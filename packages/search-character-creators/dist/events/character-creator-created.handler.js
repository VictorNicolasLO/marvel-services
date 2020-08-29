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
const character_creators_1 = require("@marvel/character-creators");
const read_character_creator_repository_1 = require("../repositories/read-character-creator.repository");
const generate_name_id_1 = require("../utils/generate-name-id");
let CharacterCreatorCreatedHandler = class CharacterCreatorCreatedHandler {
    constructor(readCharacterCreatorRepository) {
        this.readCharacterCreatorRepository = readCharacterCreatorRepository;
    }
    async handle({ characterCreator }) {
        const nameId = generate_name_id_1.generateNameId(characterCreator.character.name);
        const { value: characterCreatorsFound, unlock, } = await this.readCharacterCreatorRepository.getAndLock(nameId);
        if (characterCreatorsFound) {
            characterCreatorsFound.lastSync = new Date();
            if (!characterCreatorsFound[characterCreator.role]) {
                characterCreatorsFound[characterCreator.role] = [];
            }
            characterCreatorsFound[characterCreator.role].push(characterCreator.creator);
            await this.readCharacterCreatorRepository.put(nameId, characterCreatorsFound);
        }
        else {
            await this.readCharacterCreatorRepository.put(nameId, {
                lastSync: new Date(),
                mainCharacter: characterCreator.character,
                [characterCreator.role]: [characterCreator.creator],
            });
        }
        await unlock();
    }
};
CharacterCreatorCreatedHandler = __decorate([
    cqrs_1.EventsHandler(character_creators_1.CharacterCreatorCreatedEvent),
    __metadata("design:paramtypes", [read_character_creator_repository_1.ReadCharacterCreatorRepository])
], CharacterCreatorCreatedHandler);
exports.CharacterCreatorCreatedHandler = CharacterCreatorCreatedHandler;
//# sourceMappingURL=character-creator-created.handler.js.map