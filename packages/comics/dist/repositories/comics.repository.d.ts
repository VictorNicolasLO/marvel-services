import { GenericRepository } from "@marvel/infrastructure";
import { IComic } from "../models/interfaces/icomic";
import { ComicModel } from "../models/comic.model";
import { EventPublisher } from "@nestjs/cqrs";
export declare class ComicsRepository extends GenericRepository<ComicModel, IComic> {
    ep: EventPublisher;
    constructor(ep: EventPublisher);
}
