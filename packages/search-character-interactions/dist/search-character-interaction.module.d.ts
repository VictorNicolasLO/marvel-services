import { OnModuleInit } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { AppEventPublisher, AppQueryBus } from "@marvel/infrastructure";
export declare class SearchCharacterInteractionModule implements OnModuleInit {
    private readonly query$;
    private readonly event$;
    private readonly eventPublisher;
    constructor(query$: AppQueryBus, event$: EventBus, eventPublisher: AppEventPublisher);
    onModuleInit(): void;
}
