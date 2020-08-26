import { Model, ModelOptions } from "@marvel/infrastructure";
import {
  ICharacterInteraction,
  IComicSummary,
  ICharacter,
} from "./interfaces/icharacter-interaction";
import { CharacterInteractionCreated } from "../events/aggregate/comic-created.event";

export class CharacterInteractionModel
  extends Model<ICharacterInteraction>
  implements ICharacterInteraction {
  private _characters: ICharacter[];
  private _comic: IComicSummary;

  constructor(dto: ICharacterInteraction, options?: ModelOptions) {
    super(dto, options);
  }

  get characters() {
    return this._characters;
  }
  get comic() {
    return this._comic;
  }

  set characters(value) {
    Model.assertProp(value.length == 2, "Max 2 characters per interaction");
    this._characters = value;
  }
  set comic(value) {
    Model.assertProp(
      !!value.image && !!value.title && !!value.id,
      "Object should contain id, image and title as string"
    );
    this._comic = value;
  }

  create() {
    this.apply(new CharacterInteractionCreated(this.id, this.toDto()));
  }
}
