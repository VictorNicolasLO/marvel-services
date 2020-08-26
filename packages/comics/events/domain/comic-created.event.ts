import { ComicsDomainEvent } from "../comics-domain-event";
import { IComic } from "../../models/interfaces/icomic";
export class ComicCreatedEvent extends ComicsDomainEvent {
  constructor(public readonly comic: IComic) {
    super();
  }
}
