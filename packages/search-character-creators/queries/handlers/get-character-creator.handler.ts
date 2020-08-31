import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetCharacterCreatorByNameQuery } from "../impl/get-character-creator-by-name.query";
import { ReadCharacterCreatorRepository } from "../../repositories/read-character-creator.repository";
import { NotFoundException } from "@nestjs/common";

@QueryHandler(GetCharacterCreatorByNameQuery)
export class GetCharacterCreatorByNameHandler
  implements IQueryHandler<GetCharacterCreatorByNameQuery> {
  constructor(private readonly repository: ReadCharacterCreatorRepository) {}

  async execute(query: GetCharacterCreatorByNameQuery) {
    const characterCreators = await this.repository.get(query.name);
    if (!characterCreators) {
      throw new NotFoundException(`${query.name} character creators not found`);
    }
    return characterCreators;
  }
}
