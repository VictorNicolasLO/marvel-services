import { ICommandHandler } from "@nestjs/cqrs";
import { CreateCharacterCreatorCommand } from "../impl/create-character-creator.command";
import { CharacterCreatorRepository } from "../../repositories/character-creator.repository";
export declare class CreateCharacterCreatorHandler implements ICommandHandler<CreateCharacterCreatorCommand> {
    private readonly repository;
    constructor(repository: CharacterCreatorRepository);
    execute(command: CreateCharacterCreatorCommand): Promise<import("../../models/interfaces/icharacter-creator").ICharacterCreator & {
        id: string;
    }>;
}
