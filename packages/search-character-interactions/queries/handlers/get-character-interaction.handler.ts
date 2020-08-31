import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetCharacterInteractionByNameQuery } from "../impl/get-character-interaction-by-name.query";
import { ReadCharacterInteractionsRepository } from "../../repositories/read-character-interactions.repository";
import { NotFoundException } from "@nestjs/common";
@QueryHandler(GetCharacterInteractionByNameQuery)
export class GetCharacterInteractionByNameHandler
  implements IQueryHandler<GetCharacterInteractionByNameQuery> {
  constructor(
    private readonly repository: ReadCharacterInteractionsRepository
  ) {}

  async execute(query: GetCharacterInteractionByNameQuery) {
    const characterInteractions = await this.repository.get(query.name);
    if (!characterInteractions) {
      throw new NotFoundException(
        `${query.name} character interactions not found`
      );
    }
    return characterInteractions;
  }
}
