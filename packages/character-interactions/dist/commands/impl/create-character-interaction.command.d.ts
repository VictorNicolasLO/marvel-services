import { ComicsCommand } from "../character-interaction-command";
import { ICharacterInteraction } from "../../models/interfaces/icharacter-interaction";
export declare class CreateCharacterInteractionCommand extends ComicsCommand {
    characterInteractionDto: ICharacterInteraction;
    constructor(characterInteractionDto: ICharacterInteraction);
}
