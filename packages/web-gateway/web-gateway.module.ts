import { Module } from "@nestjs/common";
import { CharactersController } from "./controllers/characters.controller";
import { CollaboratorsController } from "./controllers/collaborators.controller";
import { AppCommandBus, AppQueryBus } from "@marvel/infrastructure";
import { HealtCheckController } from "./controllers/healtcheck.controller";
@Module({
  controllers: [
    CharactersController,
    CollaboratorsController,
    HealtCheckController,
  ],
  providers: [AppCommandBus, AppQueryBus],
})
export class WebGatewayModule {
  constructor(
    private readonly command$: AppCommandBus,
    private readonly appQueryBus: AppQueryBus
  ) {
    /** ------------ */
    this.command$.domainName = "web-gateway";
    this.appQueryBus.domainName = "web-gateway";
  }
}
