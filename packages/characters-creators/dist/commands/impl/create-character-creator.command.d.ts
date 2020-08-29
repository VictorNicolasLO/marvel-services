import { CharacterCreatorCommand } from "../character-creators-command";
import { ICharacterCreator } from "../../models/interfaces/icharacter-creator";
export declare class CreateCharacterCreatorCommand extends CharacterCreatorCommand {
    characterCreatorDto: ICharacterCreator;
    constructor(characterCreatorDto: ICharacterCreator);
}
