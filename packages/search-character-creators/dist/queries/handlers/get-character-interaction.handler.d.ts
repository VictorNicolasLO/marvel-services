import { IQueryHandler } from "@nestjs/cqrs";
import { GetCharacterInteractionByNameQuery } from "../impl/get-character-interaction-by-name.query";
import { ReadCharacterInteractionsRepository } from "../../repositories/read-character-interactions.repository";
export declare class GetCharacterInteractionByNameHandler implements IQueryHandler<GetCharacterInteractionByNameQuery> {
    private readonly repository;
    constructor(repository: ReadCharacterInteractionsRepository);
    execute(query: GetCharacterInteractionByNameQuery): Promise<import("../../repositories/interfaces/icharacter-interactions").ICharacterInteractions>;
}
