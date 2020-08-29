import { OnModuleInit } from "@nestjs/common";
import { AppEventPublisher, AppQueryBus, AppEventBus } from "@marvel/infrastructure";
export declare class SearchCharacterInteractionModule implements OnModuleInit {
    private readonly query$;
    private readonly event$;
    private readonly eventPublisher;
    constructor(query$: AppQueryBus, event$: AppEventBus, eventPublisher: AppEventPublisher);
    onModuleInit(): void;
}
