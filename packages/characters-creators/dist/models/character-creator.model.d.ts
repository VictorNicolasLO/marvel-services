import { Model, ModelOptions } from "@marvel/infrastructure";
import { ICharacterCreator, ICharacter, ICreatorSummary } from "./interfaces/icharacter-creator";
export declare class CharacterCreatorModel extends Model<ICharacterCreator> implements ICharacterCreator {
    constructor(dto: ICharacterCreator, options?: ModelOptions);
    role: string;
    characterId: string;
    creatorId: string;
    character: ICharacter;
    creator: ICreatorSummary;
    create(): void;
}
