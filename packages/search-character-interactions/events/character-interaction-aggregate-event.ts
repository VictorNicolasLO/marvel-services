import { AggregateEvent } from "@marvel/infrastructure";

export abstract class CharacterInteractionAggregateEvent extends AggregateEvent {
  static aggregateName = "character-interaction";
}
