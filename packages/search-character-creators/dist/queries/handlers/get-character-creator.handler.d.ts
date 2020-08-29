import { IQueryHandler } from "@nestjs/cqrs";
import { GetCharacterCreatorByNameQuery } from "../impl/get-character-creator-by-name.query";
import { ReadCharacterCreatorRepository } from "../../repositories/read-character-creator.repository";
export declare class GetCharacterCreatorByNameHandler implements IQueryHandler<GetCharacterCreatorByNameQuery> {
    private readonly repository;
    constructor(repository: ReadCharacterCreatorRepository);
    execute(query: GetCharacterCreatorByNameQuery): Promise<import("../../repositories/interfaces/icharacter-creator").ICharacterCreator>;
}
