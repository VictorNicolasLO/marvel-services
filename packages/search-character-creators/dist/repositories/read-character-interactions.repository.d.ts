import { AppEventPublisher, GenericQueryKeyValueRepository } from "@marvel/infrastructure";
import { ICharacterInteractions } from "./interfaces/icharacter-interactions";
export declare class ReadCharacterInteractionsRepository extends GenericQueryKeyValueRepository<ICharacterInteractions> {
    ep: AppEventPublisher;
    constructor(ep: AppEventPublisher);
}
