import { OnModuleInit } from "@nestjs/common";
import { AppEventPublisher, AppQueryBus, AppEventBus } from "@marvel/infrastructure";
export declare class SearchCharacterCreatorsModule implements OnModuleInit {
    private readonly query$;
    private readonly event$;
    private readonly eventPublisher;
    constructor(query$: AppQueryBus, event$: AppEventBus, eventPublisher: AppEventPublisher);
    onModuleInit(): void;
}
