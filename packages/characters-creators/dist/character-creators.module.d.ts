import { OnModuleInit } from "@nestjs/common";
import { AppEventPublisher, AppCommandBus, AppEventBus } from "@marvel/infrastructure";
export declare class CharacterCreatorsModule implements OnModuleInit {
    private readonly command$;
    private readonly event$;
    private readonly eventPublisher;
    constructor(command$: AppCommandBus, event$: AppEventBus, eventPublisher: AppEventPublisher);
    onModuleInit(): void;
}
