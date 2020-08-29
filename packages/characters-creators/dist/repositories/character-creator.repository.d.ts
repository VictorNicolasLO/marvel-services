import { GenericRepository, AppEventPublisher } from "@marvel/infrastructure";
import { ICharacterCreator } from "../models/interfaces/icharacter-creator";
import { CharacterCreatorModel } from "../models/character-creator.model";
export declare class CharacterCreatorRepository extends GenericRepository<CharacterCreatorModel, ICharacterCreator> {
    ep: AppEventPublisher;
    constructor(ep: AppEventPublisher);
}
