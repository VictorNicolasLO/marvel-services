import { Model, ModelOptions } from "@marvel/infrastructure";
import { ICharacterInteraction, IComicSummary, ICharacter } from "./interfaces/icharacter-interaction";
export declare class CharacterInteractionModel extends Model<ICharacterInteraction> implements ICharacterInteraction {
    private _characters;
    private _comic;
    constructor(dto: ICharacterInteraction, options?: ModelOptions);
    get characters(): ICharacter[];
    get comic(): IComicSummary;
    set characters(value: ICharacter[]);
    set comic(value: IComicSummary);
    create(): void;
}
