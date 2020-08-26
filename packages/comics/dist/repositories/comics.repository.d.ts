import { GenericRepository, AppEventPublisher } from "@marvel/infrastructure";
import { IComic } from "../models/interfaces/icomic";
import { ComicModel } from "../models/comic.model";
export declare class ComicsRepository extends GenericRepository<ComicModel, IComic> {
    ep: AppEventPublisher;
    constructor(ep: AppEventPublisher);
}
