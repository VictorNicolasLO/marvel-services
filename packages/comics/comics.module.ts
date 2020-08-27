import { Module, OnModuleInit } from "@nestjs/common";
import { ComicsRepository } from "./repositories/comics.repository";
import { CqrsModule, EventBus } from "@nestjs/cqrs";
import { AppEventPublisher, AppCommandBus } from "@marvel/infrastructure";
import { CreateComicHandler } from "./commands/handlers/create-comic.handler";

@Module({
  imports: [CqrsModule],
  providers: [
    ComicsRepository,
    AppEventPublisher,
    CreateComicHandler,
    AppCommandBus,
  ],
})
export class ComicsModule implements OnModuleInit {
  constructor(
    private readonly command$: AppCommandBus,
    private readonly event$: EventBus,
    private readonly eventPublisher: AppEventPublisher
  ) {}
  onModuleInit() {
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
