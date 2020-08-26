import { Injectable } from "@nestjs/common";
import {
  GenericRepository,
  MongoDriver,
  AppEventPublisher,
} from "@marvel/infrastructure";
import { IComic } from "../models/interfaces/icomic";
import { ComicModel } from "../models/comic.model";

@Injectable()
export class ComicsRepository extends GenericRepository<ComicModel, IComic> {
  constructor(public ep: AppEventPublisher) {
    super(new MongoDriver("comics"), ComicModel, ep);
  }
}
