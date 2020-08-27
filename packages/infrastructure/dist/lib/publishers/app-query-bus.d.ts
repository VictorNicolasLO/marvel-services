import { QueryBus, IQuery, IQueryResult } from "@nestjs/cqrs";
export declare class AppQueryBus extends QueryBus {
    private handlersClasses;
    private _domainName;
    set domainName(value: string);
    get domainName(): string;
    groupIdPrefix: string;
    execute<T extends IQuery, TResult extends IQueryResult>(command: T): Promise<TResult>;
    registerHandler(handler: any): Promise<void>;
    bind(handler: any, name: any): void;
}
