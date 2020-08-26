import { Model, ModelOptions } from "@marvel/infrastructure";
import { IComic, ICharacter, ICreators } from "./interfaces/icomic";
export declare class ComicModel extends Model<IComic> implements IComic {
    constructor(dto: IComic, options?: ModelOptions);
    _title: string;
    _image: string;
    _characters: ICharacter[];
    _creators: ICreators[];
    get title(): string;
    get image(): string;
    get characters(): ICharacter[];
    get creators(): ICreators[];
    set title(value: string);
    set image(value: string);
    set characters(value: ICharacter[]);
    set creators(value: ICreators[]);
    create(): void;
}
