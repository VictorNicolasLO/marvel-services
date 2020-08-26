import { Module } from "@nestjs/common";
import { CharacterInteractionsRepository } from "./repositories/character-interactions.repository";
import { CqrsModule, EventBus } from "@nestjs/cqrs";
import { AppEventPublisher, AppCommandBus } from "@marvel/infrastructure";
import { CreateCharacterInteractionHandler } from "./commands/handlers/create-character-interaction.handler";
import { ComicCreatedEventDomain } from "@marvel/comics";
@Module({
  imports: [CqrsModule],
  providers: [
    CharacterInteractionsRepository,
    AppEventPublisher,
    AppCommandBus,
    CreateCharacterInteractionHandler,
  ],
})
export class CharacterInteractionModule {
  constructor(
    private readonly command$: AppCommandBus,
    private readonly event$: EventBus,
    private readonly eventPublisher: AppEventPublisher
  ) {
    /** ------------ */
    this.eventPublisher.setDomainName("character-interactions");
    this.eventPublisher.registerEvents([ComicCreatedEventDomain]);
    this.eventPublisher.bridgeEventsTo((this.event$ as any).subject$);
    this.event$.publisher = this.eventPublisher;
    this.event$.registerSagas([]);
    /** ------------ */
    this.command$.domainName = "character-interactions";
    this.command$.register([CreateCharacterInteractionHandler]);
  }
}
