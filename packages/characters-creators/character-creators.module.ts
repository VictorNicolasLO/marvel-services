import { Module, OnModuleInit } from "@nestjs/common";
import { CharacterCreatorRepository } from "./repositories/character-creator.repository";
import { CqrsModule } from "@nestjs/cqrs";
import {
  AppEventPublisher,
  AppCommandBus,
  AppEventBus,
} from "@marvel/infrastructure";
import { CreateCharacterCreatorHandler } from "./commands/handlers/create-character-creator.handler";
import { ComicCreatedEventDomain } from "@marvel/comics";
import { ComicsSaga } from "./sagas/comics.saga";

const DOMAIN_NAME = "character-creators";

@Module({
  imports: [CqrsModule],
  providers: [
    CharacterCreatorRepository,
    AppEventPublisher,
    AppCommandBus,
    CreateCharacterCreatorHandler,
    ComicsSaga,
    AppEventBus,
  ],
})
export class CharacterCreatorsModule implements OnModuleInit {
  constructor(
    private readonly command$: AppCommandBus,
    private readonly event$: AppEventBus,
    private readonly eventPublisher: AppEventPublisher
  ) {}
  onModuleInit() {
    /** ------------ */
    this.eventPublisher.groupIdPrefix = "v2";
    this.eventPublisher.setDomainName(DOMAIN_NAME);
    this.eventPublisher.registerEvents([ComicCreatedEventDomain]);
    this.eventPublisher.bridgeEventsTo(this.event$.subject$);
    this.event$.publisher = this.eventPublisher;
    this.event$.registerSagas([ComicsSaga]);

    /** ------------ */
    this.command$.domainName = DOMAIN_NAME;
    this.command$.register([CreateCharacterCreatorHandler]);
  }
}
