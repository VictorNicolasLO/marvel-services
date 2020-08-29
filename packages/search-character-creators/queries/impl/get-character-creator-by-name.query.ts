import { SearchCharacterCreatorQuery } from "../search-character-creator.query";

export class GetCharacterCreatorByNameQuery extends SearchCharacterCreatorQuery {
  constructor(public name: string) {
    super();
  }
}
