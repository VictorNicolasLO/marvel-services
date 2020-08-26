import { AggregateEvent } from "@marvel/infrastructure";
export declare abstract class CharacterInteractionAggregateEvent extends AggregateEvent {
    static aggregateName: string;
}
