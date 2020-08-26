import { ComicsDomainEvent } from "../comics-domain-event";
import { IComic } from "../../models/interfaces/icomic";
export declare class ComicCreatedEvent extends ComicsDomainEvent {
    readonly comic: IComic;
    constructor(comic: IComic);
}
