import { Controller, Get, Param } from "@nestjs/common";
import { AppQueryBus } from "@marvel/infrastructure";
import { GetCharacterCreatorByNameQuery } from "@marvel/search-character-creators";

@Controller("marvel/collaborators")
export class CollaboratorsController {
  constructor(private queryBus: AppQueryBus) {}

  @Get(":nameId")
  async getCharacters(@Param("nameId") nameId) {
    return await this.queryBus.execute(
      new GetCharacterCreatorByNameQuery(nameId)
    );
  }
}
