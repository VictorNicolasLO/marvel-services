import { GenericRepository, AppEventPublisher } from "@marvel/infrastructure";
import { ICharacterInteraction } from "../models/interfaces/icharacter-interaction";
import { CharacterInteractionModel } from "../models/character-interaction.model";
export declare class CharacterInteractionsRepository extends GenericRepository<CharacterInteractionModel, ICharacterInteraction> {
    ep: AppEventPublisher;
    constructor(ep: AppEventPublisher);
}
