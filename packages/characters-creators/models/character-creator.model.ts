import { Model, ModelOptions } from "@marvel/infrastructure";
import {
  ICharacterCreator,
  ICharacter,
  ICreatorSummary,
} from "./interfaces/icharacter-creator";
import { CharacterCreatorCreatedEvent } from "../events/aggregate/character-creator-created.event";

export class CharacterCreatorModel
  extends Model<ICharacterCreator>
  implements ICharacterCreator {
  constructor(dto: ICharacterCreator, options?: ModelOptions) {
    super(dto, options);
  }
  role: string;
  characterId: string;
  creatorId: string;
  character: ICharacter;
  creator: ICreatorSummary;

  create() {
    this.apply(new CharacterCreatorCreatedEvent(this.id, this.toDto()));
  }
}
