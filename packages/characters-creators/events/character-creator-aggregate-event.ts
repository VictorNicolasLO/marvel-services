import { AggregateEvent } from "@marvel/infrastructure";

export abstract class CharacterCreatorAggregateEvent extends AggregateEvent {
  static aggregateName = "character-creator";
}
