import { Model, ModelOptions } from "@marvel/infrastructure";
import { ICharacterCreator, ICharacter, ICreatorSummary } from "./interfaces/icharacter-creator";
export declare class CharacterCreatorModel extends Model<ICharacterCreator> implements ICharacterCreator {
    private _role;
    private _characterId;
    private _creatorId;
    private _character;
    private _creator;
    constructor(dto: ICharacterCreator, options?: ModelOptions);
    get role(): string;
    get characterId(): string;
    get creatorId(): string;
    get character(): ICharacter;
    get creator(): ICreatorSummary;
    set role(value: string);
    set characterId(value: string);
    set creatorId(value: string);
    set character(value: ICharacter);
    set creator(value: ICreatorSummary);
    create(): void;
}
