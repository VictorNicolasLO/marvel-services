import { Module, OnModuleInit } from "@nestjs/common";
import { CqrsModule, EventBus } from "@nestjs/cqrs";
import { AppEventPublisher, AppQueryBus } from "@marvel/infrastructure";
import { CharacterInteractionCreatedEvent } from "@marvel/character-interactions";
import { ReadCharacterInteractionsRepository } from "./repositories/read-character-interactions.repository";
import { CharacterInteractionCreatedHandler } from "./events/character-interaction-created.handler";
import { GetCharacterInteractionByNameHandler } from "./queries/handlers/get-character-interaction.handler";

@Module({
  imports: [CqrsModule],
  providers: [
    ReadCharacterInteractionsRepository,
    AppEventPublisher,
    AppQueryBus,
    CharacterInteractionCreatedHandler,
    GetCharacterInteractionByNameHandler,
  ],
})
export class SearchCharacterInteractionModule implements OnModuleInit {
  constructor(
    private readonly query$: AppQueryBus,
    private readonly event$: EventBus,
    private readonly eventPublisher: AppEventPublisher
  ) {}
  onModuleInit() {
    /** ------------ */
    this.event$.register([CharacterInteractionCreatedHandler]);

    this.eventPublisher.setDomainName("search-character-interactions");
    this.eventPublisher.registerEvents([CharacterInteractionCreatedEvent]);
    this.eventPublisher.bridgeEventsTo((this.event$ as any).subject$);
    this.event$.publisher = this.eventPublisher;
    /** ------------ */
    this.query$.domainName = "search-character-interactions";
    this.query$.register([GetCharacterInteractionByNameHandler]);
  }
}
