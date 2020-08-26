import { ComicsCommand } from "../comics-command";
import { IComic } from "../../models/interfaces/icomic";

export class CreateComicCommand extends ComicsCommand {
  constructor(public comicDto: IComic) {
    super();
  }
}
