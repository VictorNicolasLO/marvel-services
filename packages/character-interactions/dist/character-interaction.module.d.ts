import { EventBus } from "@nestjs/cqrs";
import { AppEventPublisher, AppCommandBus } from "@marvel/infrastructure";
export declare class CharacterInteractionModule {
    private readonly command$;
    private readonly event$;
    private readonly eventPublisher;
    constructor(command$: AppCommandBus, event$: EventBus, eventPublisher: AppEventPublisher);
}
