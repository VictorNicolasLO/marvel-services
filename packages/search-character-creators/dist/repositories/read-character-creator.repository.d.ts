import { AppEventPublisher, GenericQueryKeyValueRepository } from "@marvel/infrastructure";
import { ICharacterCreator } from "./interfaces/icharacter-creator";
export declare class ReadCharacterCreatorRepository extends GenericQueryKeyValueRepository<ICharacterCreator> {
    ep: AppEventPublisher;
    constructor(ep: AppEventPublisher);
}
