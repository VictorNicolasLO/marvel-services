import { AggregateEvent } from "@marvel/infrastructure";

export abstract class ComicAggregateEvent extends AggregateEvent {
  static aggregateName = "comic";
}
