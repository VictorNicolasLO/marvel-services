import { ICommandHandler } from "@nestjs/cqrs";
import { CreateCharacterInteractionCommand } from "../impl/create-character-interaction.command";
import { CharacterInteractionsRepository } from "../../repositories/character-interactions.repository";
export declare class CreateCharacterInteractionHandler implements ICommandHandler<CreateCharacterInteractionCommand> {
    private readonly repository;
    constructor(repository: CharacterInteractionsRepository);
    execute(command: CreateCharacterInteractionCommand): Promise<import("../../models/interfaces/icharacter-interaction").ICharacterInteraction & {
        id: string;
    }>;
}
