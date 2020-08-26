import { Module } from "@nestjs/common";
import { ComicsRepository } from "./repositories/comics.repository";
import { CqrsModule, EventBus } from "@nestjs/cqrs";
import { AppEventPublisher, AppCommandBus } from "@marvel/infrastructure";
import { CreateComicHandler } from "./commands/handlers/create-comic.handler";

@Module({
  imports: [CqrsModule],
  providers: [
    ComicsRepository,
    AppEventPublisher,
    AppCommandBus,
    CreateComicHandler,
  ],
})
export class ComicsModule {
  constructor(
    private readonly command$: AppCommandBus,
    private readonly event$: EventBus,
    private readonly eventPublisher: AppEventPublisher
  ) {
    /** ------------ */
    this.eventPublisher.setDomainName("comics");
    this.eventPublisher.registerEvents([]);
    this.eventPublisher.bridgeEventsTo((this.event$ as any).subject$);
    this.event$.publisher = this.eventPublisher;
    /** ------------ */
    this.command$.domainName = "comics";
    this.command$.register([CreateComicHandler]);
  }
}
