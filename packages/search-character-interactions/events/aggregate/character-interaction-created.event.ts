import { CharacterInteractionAggregateEvent } from "../character-interaction-aggregate-event";
import { ICharacterInteraction } from "../../models/interfaces/icharacter-interaction";
export class CharacterInteractionCreated extends CharacterInteractionAggregateEvent {
  constructor(
    public aggregateId: string,
    public readonly comic: ICharacterInteraction
  ) {
    super();
  }
}
