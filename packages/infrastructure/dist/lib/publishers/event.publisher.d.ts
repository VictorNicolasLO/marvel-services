import { IEventPublisher, IMessageSource, IEvent, EventPublisher as Es, EventBus } from "@nestjs/cqrs";
import { Subject } from "rxjs";
export declare class AppEventPublisher extends Es implements IEventPublisher, IMessageSource {
    private es;
    domainName: string;
    eventClasses: any[];
    constructor(es: EventBus);
    groupIdPrefix: string;
    setDomainName(domainName: string): void;
    publish<T extends IEvent>(event: T): void;
    bridgeEventsTo<T extends IEvent>(subject: Subject<T>): void;
    registerEvents(eventClasses: any[]): void;
}
