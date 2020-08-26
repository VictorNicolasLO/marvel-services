import { IEventHandler } from "@nestjs/cqrs";
import { CharacterInteractionCreatedEvent } from "@marvel/character-interactions";
import { ReadCharacterInteractionsRepository } from "../repositories/read-character-interactions.repository";
export declare class CharacterInteractionCreatedHandler implements IEventHandler<CharacterInteractionCreatedEvent> {
    private readCharacterInteractionsRepository;
    constructor(readCharacterInteractionsRepository: ReadCharacterInteractionsRepository);
    handle({ characterInteraction }: CharacterInteractionCreatedEvent): Promise<void>;
}
