import { Module, OnModuleInit } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import {
  AppEventPublisher,
  AppQueryBus,
  AppEventBus,
  AppCommandBus,
} from "@marvel/infrastructure";
import { CharacterCreatorCreatedEvent } from "@marvel/character-creators";
import { ReadCharacterCreatorRepository } from "./repositories/read-character-creator.repository";
import { CharacterCreatorCreatedHandler } from "./events/character-creator-created.handler";
import { GetCharacterCreatorByNameHandler } from "./queries/handlers/get-character-creator.handler";

@Module({
  imports: [CqrsModule],
  providers: [
    ReadCharacterCreatorRepository,
    AppEventPublisher,
    AppQueryBus,
    CharacterCreatorCreatedHandler,
    GetCharacterCreatorByNameHandler,
    AppEventBus,
    AppCommandBus,
  ],
})
export class SearchCharacterCreatorsModule implements OnModuleInit {
  constructor(
    private readonly query$: AppQueryBus,
    private readonly event$: AppEventBus,
    private readonly eventPublisher: AppEventPublisher
  ) {}
  onModuleInit() {
    /** ------------ */
    this.event$.register([CharacterCreatorCreatedHandler]);
    this.eventPublisher.groupIdPrefix = "v2";
    this.eventPublisher.setDomainName("search-character-creators");
    this.eventPublisher.registerEvents([CharacterCreatorCreatedEvent]);
    this.eventPublisher.bridgeEventsTo(this.event$.subject$);
    this.event$.publisher = this.eventPublisher;
    /** ------------ */
    this.query$.domainName = "search-character-creators";
    this.query$.register([GetCharacterCreatorByNameHandler]);
  }
}
