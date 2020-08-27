import { Controller, Get, Param } from "@nestjs/common";
import { AppQueryBus } from "@marvel/infrastructure";
import { GetCharacterInteractionByNameQuery } from "@marvel/search-character-interactions";

@Controller("characters")
export class CharactersController {
  constructor(private queryBus: AppQueryBus) {}

  @Get(":nameId")
  async getCharacters(@Param("nameId") nameId) {
    return await this.queryBus.execute(
      new GetCharacterInteractionByNameQuery(nameId)
    );
  }
}
