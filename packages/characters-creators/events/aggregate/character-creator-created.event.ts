import { CharacterCreatorAggregateEvent } from "../character-creator-aggregate-event";
import { ICharacterCreator } from "../../models/interfaces/icharacter-creator";
export class CharacterCreatorCreatedEvent extends CharacterCreatorAggregateEvent {
  constructor(
    public aggregateId: string,
    public readonly characterCreator: ICharacterCreator
  ) {
    super();
  }
}
