import { Module, OnModuleInit } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import {
  AppEventPublisher,
  AppQueryBus,
  AppEventBus,
  AppCommandBus,
} from "@marvel/infrastructure";
import { CharacterInteractionCreatedEvent } from "@marvel/character-interactions";
import { ReadCharacterInteractionsRepository } from "./repositories/read-character-interactions.repository";
import { CharacterInteractionCreatedHandler } from "./events/character-interaction-created.handler";
import { GetCharacterInteractionByNameHandler } from "./queries/handlers/get-character-interaction.handler";

@Module({
  imports: [CqrsModule],
  providers: [
    AppCommandBus,
    ReadCharacterInteractionsRepository,
    AppEventPublisher,
    AppQueryBus,
    CharacterInteractionCreatedHandler,
    GetCharacterInteractionByNameHandler,
    AppEventBus,
  ],
})
export class SearchCharacterInteractionModule implements OnModuleInit {
  constructor(
    private readonly query$: AppQueryBus,
    private readonly event$: AppEventBus,
    private readonly eventPublisher: AppEventPublisher
  ) {}
  onModuleInit() {
    /** ------------ */
    this.event$.register([CharacterInteractionCreatedHandler]);
    this.eventPublisher.groupIdPrefix = "v13";
    this.eventPublisher.setDomainName("search-character-interactions");
    this.eventPublisher.registerEvents([CharacterInteractionCreatedEvent]);
    this.eventPublisher.bridgeEventsTo(this.event$.subject$);
    this.event$.publisher = this.eventPublisher;
    /** ------------ */
    this.query$.domainName = "search-character-interactions";
    this.query$.register([GetCharacterInteractionByNameHandler]);
  }
}
