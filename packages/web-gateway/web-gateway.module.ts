import { Module } from "@nestjs/common";
import { CharactersController } from "./controllers/characters.controller";
import { AppCommandBus, AppQueryBus } from "@marvel/infrastructure";
@Module({
  controllers: [CharactersController],
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
