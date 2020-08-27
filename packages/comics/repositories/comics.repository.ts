import { Injectable } from "@nestjs/common";
import { GenericRepository, MongoDriver } from "@marvel/infrastructure";
import { IComic } from "../models/interfaces/icomic";
import { ComicModel } from "../models/comic.model";
import { EventPublisher } from "@nestjs/cqrs";

@Injectable()
export class ComicsRepository extends GenericRepository<ComicModel, IComic> {
  constructor(public ep: EventPublisher) {
    super(new MongoDriver("comics"), ComicModel, ep);
  }
}
