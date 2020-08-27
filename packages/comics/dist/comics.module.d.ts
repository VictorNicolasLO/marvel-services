import { OnModuleInit } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { AppEventPublisher, AppCommandBus } from "@marvel/infrastructure";
export declare class ComicsModule implements OnModuleInit {
    private readonly command$;
    private readonly event$;
    private readonly eventPublisher;
    constructor(command$: AppCommandBus, event$: EventBus, eventPublisher: AppEventPublisher);
    onModuleInit(): void;
}
