import { ComicAggregateEvent } from "../comic-aggregate-event";
import { IComic } from "../../models/interfaces/icomic";
export class ComicCreatedEvent extends ComicAggregateEvent {
  constructor(public aggregateId: string, public readonly comic: IComic) {
    super();
  }
}
