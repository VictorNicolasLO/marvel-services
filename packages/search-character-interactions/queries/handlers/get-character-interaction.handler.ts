import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetCharacterInteractionByNameQuery } from "../impl/get-character-interaction-by-name.query";
import { ReadCharacterInteractionsRepository } from "../../repositories/read-character-interactions.repository";

@QueryHandler(GetCharacterInteractionByNameQuery)
export class GetCharacterInteractionByNameHandler
  implements IQueryHandler<GetCharacterInteractionByNameQuery> {
  constructor(
    private readonly repository: ReadCharacterInteractionsRepository
  ) {}

  async execute(query: GetCharacterInteractionByNameQuery) {
    return await this.repository.get(query.name);
  }
}
