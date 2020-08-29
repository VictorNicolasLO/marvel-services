import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetCharacterCreatorByNameQuery } from "../impl/get-character-creator-by-name.query";
import { ReadCharacterCreatorRepository } from "../../repositories/read-character-creator.repository";

@QueryHandler(GetCharacterCreatorByNameQuery)
export class GetCharacterCreatorByNameHandler
  implements IQueryHandler<GetCharacterCreatorByNameQuery> {
  constructor(private readonly repository: ReadCharacterCreatorRepository) {}

  async execute(query: GetCharacterCreatorByNameQuery) {
    return await this.repository.get(query.name);
  }
}
