import { SearchCharacterInteractionQuery } from "../search-character-interaction.query";

export class GetCharacterInteractionByNameQuery extends SearchCharacterInteractionQuery {
  constructor(public name: string) {
    super();
  }
}
