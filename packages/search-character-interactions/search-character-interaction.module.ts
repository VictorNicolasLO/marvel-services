import { Module } from "@nestjs/common";
import { CqrsModule, EventBus } from "@nestjs/cqrs";
import { AppEventPublisher, AppQueryBus } from "@marvel/infrastructure";
import { CharacterInteractionCreatedEvent } from "@marvel/character-interactions";
import { ReadCharacterInteractionsRepository } from "./repositories/read-character-interactions.repository";

@Module({
  imports: [CqrsModule],
  providers: [
    ReadCharacterInteractionsRepository,
    AppEventPublisher,
    AppQueryBus,
    CreateCharacterInteractionHandler,
  ],
})
export class SearchCharacterInteractionModule {
  constructor(
    private readonly query$: AppQueryBus,
    private readonly event$: EventBus,
    private readonly eventPublisher: AppEventPublisher
  ) {
    /** ------------ */
    this.eventPublisher.setDomainName("search-character-interactions");
    this.eventPublisher.registerEvents([CharacterInteractionCreatedEvent]);
    this.eventPublisher.bridgeEventsTo((this.event$ as any).subject$);
    this.event$.publisher = this.eventPublisher;
    /** ------------ */
    this.query$.domainName = "search-character-interactions";
    this.query$.register([]);
  }
}
