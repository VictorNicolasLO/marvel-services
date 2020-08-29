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
const character_interactions_1 = require("@marvel/character-interactions");
const read_character_interactions_repository_1 = require("../repositories/read-character-interactions.repository");
const generate_name_id_1 = require("../utils/generate-name-id");
let CharacterInteractionCreatedHandler = class CharacterInteractionCreatedHandler {
    constructor(readCharacterInteractionsRepository) {
        this.readCharacterInteractionsRepository = readCharacterInteractionsRepository;
    }
    async handle({ characterInteraction }) {
        for (let index = 0; index < characterInteraction.characters.length; index++) {
            const character = characterInteraction.characters[index];
            const characterToAdd = characterInteraction.characters[index - 1] ||
                characterInteraction.characters[index + 1];
            const nameId = generate_name_id_1.generateNameId(character.name);
            const interactionsFound = await this.readCharacterInteractionsRepository.get(nameId);
            const comicSummary = {
                name: characterInteraction.comic.title,
                image: characterInteraction.comic.image,
            };
            if (interactionsFound) {
                const characterAlreadyRelatedIndex = interactionsFound.characters.findIndex((character) => character.id === characterToAdd.id);
                const characterAlreadyRelated = interactionsFound.characters[characterAlreadyRelatedIndex];
                if (characterAlreadyRelated) {
                    characterAlreadyRelated.comics.push(comicSummary);
                    interactionsFound.characters[index] = characterAlreadyRelated;
                }
                else {
                    interactionsFound.characters.push({
                        comics: [comicSummary],
                        id: characterToAdd.id,
                        name: characterToAdd.name,
                    });
                }
                interactionsFound.lastSync = new Date();
                await this.readCharacterInteractionsRepository.put(nameId, interactionsFound);
            }
            else {
                await this.readCharacterInteractionsRepository.put(nameId, {
                    mainCharacter: character,
                    lastSync: new Date(),
                    characters: [
                        {
                            id: characterToAdd.id,
                            name: characterToAdd.name,
                            comics: [comicSummary],
                        },
                    ],
                });
            }
        }
    }
};
CharacterInteractionCreatedHandler = __decorate([
    cqrs_1.EventsHandler(character_interactions_1.CharacterInteractionCreatedEvent),
    __metadata("design:paramtypes", [read_character_interactions_repository_1.ReadCharacterInteractionsRepository])
], CharacterInteractionCreatedHandler);
exports.CharacterInteractionCreatedHandler = CharacterInteractionCreatedHandler;
//# sourceMappingURL=character-interaction-created.handler.js.map