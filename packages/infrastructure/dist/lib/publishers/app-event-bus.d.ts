import { EventBus } from "@nestjs/cqrs";
import { AppCommandBus } from "./app-command-bus";
import { ModuleRef } from "@nestjs/core";
export declare class AppEventBus extends EventBus {
    constructor(commandBus: AppCommandBus, moduleRef: ModuleRef);
    subject$: any;
    bind(handler: any, name: any): void;
    publish(event: any): void;
}
