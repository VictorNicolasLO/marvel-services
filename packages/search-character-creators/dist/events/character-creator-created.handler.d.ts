import { IEventHandler } from "@nestjs/cqrs";
import { CharacterCreatorCreatedEvent } from "@marvel/character-creators";
import { ReadCharacterCreatorRepository } from "../repositories/read-character-creator.repository";
export declare class CharacterCreatorCreatedHandler implements IEventHandler<CharacterCreatorCreatedEvent> {
    private readCharacterCreatorRepository;
    constructor(readCharacterCreatorRepository: ReadCharacterCreatorRepository);
    handle({ characterCreator }: CharacterCreatorCreatedEvent): Promise<void>;
}
