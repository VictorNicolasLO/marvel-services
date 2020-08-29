import { CharacterCreatorCommand } from "../character-creators-command";
import { ICharacterCreator } from "../../models/interfaces/icharacter-creator";

export class CreateCharacterCreatorCommand extends CharacterCreatorCommand {
  constructor(public characterCreatorDto: ICharacterCreator) {
    super();
  }
}
