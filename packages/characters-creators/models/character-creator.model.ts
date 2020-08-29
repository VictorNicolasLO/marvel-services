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
  private _role: string;
  private _characterId: string;
  private _creatorId: string;
  private _character: ICharacter;
  private _creator: ICreatorSummary;
  constructor(dto: ICharacterCreator, options?: ModelOptions) {
    super(dto, options);
  }

  get role() {
    return this._role;
  }
  get characterId() {
    return this._characterId;
  }
  get creatorId() {
    return this._creatorId;
  }
  get character() {
    return this._character;
  }
  get creator() {
    return this._creator;
  }

  set role(value) {
    this._role = value;
  }
  set characterId(value) {
    this._characterId = value;
  }
  set creatorId(value) {
    this._creatorId = value;
  }
  set character(value) {
    this._character = value;
  }
  set creator(value) {
    this._creator = value;
  }

  create() {
    this.apply(new CharacterCreatorCreatedEvent(this.id, this.toDto()));
  }
}
