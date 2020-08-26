import { EventBus } from "@nestjs/cqrs";
import { AppEventPublisher, AppQueryBus } from "@marvel/infrastructure";
export declare class SearchCharacterInteractionModule {
    private readonly query$;
    private readonly event$;
    private readonly eventPublisher;
    constructor(query$: AppQueryBus, event$: EventBus, eventPublisher: AppEventPublisher);
}
