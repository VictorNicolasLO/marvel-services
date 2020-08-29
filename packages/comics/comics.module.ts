import { Module, OnModuleInit } from "@nestjs/common";
import { ComicsRepository } from "./repositories/comics.repository";
import { CqrsModule } from "@nestjs/cqrs";
import {
  AppEventPublisher,
  AppCommandBus,
  AppEventBus,
} from "@marvel/infrastructure";
import { CreateComicHandler } from "./commands/handlers/create-comic.handler";
const PREFIX = "v2";
@Module({
  imports: [CqrsModule],
  providers: [
    ComicsRepository,
    AppEventPublisher,
    CreateComicHandler,
    AppCommandBus,
    AppEventBus,
  ],
})
export class ComicsModule implements OnModuleInit {
  constructor(
    private readonly command$: AppCommandBus,
    private readonly event$: AppEventBus,
    private readonly eventPublisher: AppEventPublisher
  ) {}
  onModuleInit() {
    /** ------------ */
    this.eventPublisher.groupIdPrefix = PREFIX;
    this.eventPublisher.setDomainName("comics");
    this.eventPublisher.registerEvents([]);
    this.eventPublisher.bridgeEventsTo(this.event$.subject$);
    this.event$.publisher = this.eventPublisher;
    /** ------------ */
    this.command$.groupIdPrefix = PREFIX;
    this.command$.domainName = "comics";
    this.command$.register([CreateComicHandler]);
  }
}
