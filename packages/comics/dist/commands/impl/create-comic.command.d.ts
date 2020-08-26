import { ComicsCommand } from "../comics-command";
import { IComic } from "../../models/interfaces/icomic";
export declare class CreateComicCommand extends ComicsCommand {
    comicDto: IComic;
    constructor(comicDto: IComic);
}
