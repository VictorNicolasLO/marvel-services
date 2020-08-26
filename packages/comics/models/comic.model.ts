import { Model, ModelOptions } from "@marvel/infrastructure";
import { IComic, ICharacter, ICreators } from "./interfaces/icomic";
import { ComicCreatedEvent } from "../events/aggregate/comic-created.event";

export class ComicModel extends Model<IComic> implements IComic {
  constructor(dto: IComic, options?: ModelOptions) {
    super(dto, options);
  }

  _title: string;
  _image: string;
  _characters: ICharacter[];
  _creators: ICreators[];

  get title() {
    return this._title;
  }
  get image() {
    return this._image;
  }
  get characters() {
    return this._characters;
  }
  get creators() {
    return this._creators;
  }

  set title(value: string) {
    ComicModel.assertProp(
      value && typeof value === "string",
      "title value must be a string"
    );
    this._title = value;
  }
  set image(value: string) {
    ComicModel.assertProp(
      value && typeof value === "string",
      "image value must be a string"
    );
    this._image = value;
  }
  set characters(value: ICharacter[]) {
    ComicModel.assertProp(
      value && Array.isArray(value),
      "characters value must be an array"
    );
    this._characters = value;
  }
  set creators(value: ICreators[]) {
    ComicModel.assertProp(
      value && Array.isArray(value),
      "creators value must be an array"
    );
    this._creators = value;
  }

  create() {
    this.apply(new ComicCreatedEvent(this.id, this.toDto()));
  }
}
