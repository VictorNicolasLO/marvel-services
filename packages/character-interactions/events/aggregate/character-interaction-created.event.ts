import { CharacterInteractionAggregateEvent } from "../character-interaction-aggregate-event";
import { ICharacterInteraction } from "../../models/interfaces/icharacter-interaction";
export class CharacterInteractionCreatedEvent extends CharacterInteractionAggregateEvent {
  constructor(
    public aggregateId: string,
    public readonly characterInteraction: ICharacterInteraction
  ) {
    super();
  }
}
