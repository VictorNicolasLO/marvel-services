import { AggregateEvent } from "@marvel/infrastructure";
export declare abstract class CharacterCreatorAggregateEvent extends AggregateEvent {
    static aggregateName: string;
}
