import { CharacterCreatorAggregateEvent } from "../character-creator-aggregate-event";
import { ICharacterCreator } from "../../models/interfaces/icharacter-creator";
export declare class CharacterCreatorCreatedEvent extends CharacterCreatorAggregateEvent {
    aggregateId: string;
    readonly characterCreator: ICharacterCreator;
    constructor(aggregateId: string, characterCreator: ICharacterCreator);
}
