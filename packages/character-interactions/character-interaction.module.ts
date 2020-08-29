import { Module, OnModuleInit } from "@nestjs/common";
import { CharacterInteractionsRepository } from "./repositories/character-interactions.repository";
import { CqrsModule } from "@nestjs/cqrs";
import {
  AppEventPublisher,
  AppCommandBus,
  AppEventBus,
} from "@marvel/infrastructure";
import { CreateCharacterInteractionHandler } from "./commands/handlers/create-character-interaction.handler";
import { ComicCreatedEventDomain } from "@marvel/comics";
import { ComicsSaga } from "./sagas/comics.saga";

const DOMAIN_NAME = "character-interactions";
const SUBFIX = "v4";
@Module({
  imports: [CqrsModule],
  providers: [
    CharacterInteractionsRepository,
    AppEventPublisher,
    AppCommandBus,
    CreateCharacterInteractionHandler,
    ComicsSaga,
    AppEventBus,
  ],
})
export class CharacterInteractionModule implements OnModuleInit {
  constructor(
    private readonly command$: AppCommandBus,
    private readonly event$: AppEventBus,
    private readonly eventPublisher: AppEventPublisher
  ) {}
  onModuleInit() {
    /** ------------ */
    this.eventPublisher.groupIdPrefix = SUBFIX;
    this.eventPublisher.setDomainName(DOMAIN_NAME);
    this.eventPublisher.registerEvents([ComicCreatedEventDomain]);
    this.eventPublisher.bridgeEventsTo(this.event$.subject$);
    this.event$.publisher = this.eventPublisher;
    this.event$.registerSagas([ComicsSaga]);

    /** ------------ */
    this.command$.domainName = DOMAIN_NAME;
    this.command$.register([CreateCharacterInteractionHandler]);
  }
}
