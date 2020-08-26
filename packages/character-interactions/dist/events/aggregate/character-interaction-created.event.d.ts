import { CharacterInteractionAggregateEvent } from "../character-interaction-aggregate-event";
import { ICharacterInteraction } from "../../models/interfaces/icharacter-interaction";
export declare class CharacterInteractionCreatedEvent extends CharacterInteractionAggregateEvent {
    aggregateId: string;
    readonly characterInteraction: ICharacterInteraction;
    constructor(aggregateId: string, characterInteraction: ICharacterInteraction);
}
