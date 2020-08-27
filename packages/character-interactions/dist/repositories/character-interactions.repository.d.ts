import { GenericRepository } from "@marvel/infrastructure";
import { ICharacterInteraction } from "../models/interfaces/icharacter-interaction";
import { CharacterInteractionModel } from "../models/character-interaction.model";
import { EventPublisher } from "@nestjs/cqrs";
export declare class CharacterInteractionsRepository extends GenericRepository<CharacterInteractionModel, ICharacterInteraction> {
    ep: EventPublisher;
    constructor(ep: EventPublisher);
}
