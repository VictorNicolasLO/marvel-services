import { IEventPublisher, IMessageSource, IEvent, EventPublisher as Es } from "@nestjs/cqrs";
import { Subject } from "rxjs";
import { AppEventBus } from "./app-event-bus";
export declare class AppEventPublisher extends Es implements IEventPublisher, IMessageSource {
    private es;
    domainName: string;
    eventClasses: any[];
    constructor(es: AppEventBus);
    groupIdPrefix: string;
    setDomainName(domainName: string): void;
    publish<T extends IEvent>(event: T): void;
    bridgeEventsTo<T extends IEvent>(subject: Subject<T>): void;
    registerEvents(eventClasses: any[]): void;
    mergeClassContext(metatype: any): any;
    mergeObjectContext(object: any): any;
}
