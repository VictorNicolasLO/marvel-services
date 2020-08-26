import { ComicsCommand } from "../character-interaction-command";
import { ICharacterInteraction } from "../../models/interfaces/icharacter-interaction";

export class CreateCharacterInteractionCommand extends ComicsCommand {
  constructor(public characterInteractionDto: ICharacterInteraction) {
    super();
  }
}
