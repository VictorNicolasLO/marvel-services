import { AggregateEvent } from "@marvel/infrastructure";
export declare abstract class ComicAggregateEvent extends AggregateEvent {
    static aggregateName: string;
}
