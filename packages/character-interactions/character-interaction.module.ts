import { Module } from "@nestjs/common";
import { CharacterInteractionsRepository } from "./repositories/character-interactions.repository";
import { CqrsModule, EventBus } from "@nestjs/cqrs";
import { AppEventPublisher, AppCommandBus } from "@marvel/infrastructure";
import { CreateCharacterInteractionHandler } from "./commands/handlers/create-character-interaction.handler";
import { ComicCreatedEventDomain } from "@marvel/comics";
import { ComicsSaga } from "./sagas/comics.saga";

const DOMAIN_NAME = "character-interactions";
@Module({
  imports: [CqrsModule],
  providers: [
    CharacterInteractionsRepository,
    AppEventPublisher,
    AppCommandBus,
    CreateCharacterInteractionHandler,
    ComicsSaga,
  ],
})
export class CharacterInteractionModule {
  constructor(
    private readonly command$: AppCommandBus,
    private readonly event$: EventBus,
    private readonly eventPublisher: AppEventPublisher
  ) {
    /** ------------ */
    this.eventPublisher.setDomainName(DOMAIN_NAME);
    this.eventPublisher.registerEvents([ComicCreatedEventDomain]);
    this.eventPublisher.bridgeEventsTo((this.event$ as any).subject$);
    this.event$.publisher = this.eventPublisher;
    this.event$.registerSagas([ComicsSaga]);
    /** ------------ */
    this.command$.domainName = DOMAIN_NAME;
    this.command$.register([CreateCharacterInteractionHandler]);
  }
}
