import { ComicAggregateEvent } from "../comic-aggregate-event";
import { IComic } from "../../models/interfaces/icomic";
export declare class ComicCreatedEvent extends ComicAggregateEvent {
    aggregateId: string;
    readonly comic: IComic;
    constructor(aggregateId: string, comic: IComic);
}
