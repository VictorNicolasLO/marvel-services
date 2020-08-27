import { CommandBus, ICommand } from "@nestjs/cqrs";
import { ModuleRef } from "@nestjs/core";
export declare class AppCommandBus extends CommandBus {
    constructor(moduleRef: ModuleRef);
    private _domainName;
    set domainName(value: string);
    get domainName(): string;
    groupIdPrefix: string;
    execute<T extends ICommand>(command: T): Promise<any>;
    bind(handler: any, name: any): void;
    registerHandler(handler: any): Promise<void>;
}
