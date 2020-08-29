import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetCharacterInteractionByNameQuery } from "../impl/get-character-interaction-by-name.query";
import { ReadCharacterInteractionsRepository } from "../../repositories/read-character-interactions.repository";
function byteCount(s) {
  return encodeURI(s).split(/%..|./).length - 1;
}
@QueryHandler(GetCharacterInteractionByNameQuery)
export class GetCharacterInteractionByNameHandler
  implements IQueryHandler<GetCharacterInteractionByNameQuery> {
  constructor(
    private readonly repository: ReadCharacterInteractionsRepository
  ) {}

  async execute(query: GetCharacterInteractionByNameQuery) {
    const result = await this.repository.get(query.name);

    console.log(byteCount(JSON.stringify(result)));
    return result;
  }
}
