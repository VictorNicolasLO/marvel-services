import {
  IEventPublisher,
  IMessageSource,
  IEvent,
  EventPublisher as Es,
  EventBus,
} from "@nestjs/cqrs";
import { Subject, async } from "rxjs";
import { Injectable } from "@nestjs/common";
import { KafkaBroker } from "../brokers/kafka";
import { AppEventBus } from "./app-event-bus";

const PREFIX = process.env.BROKER_PREFIX || "";

@Injectable()
export class AppEventPublisher
  extends Es
  implements IEventPublisher, IMessageSource {
  domainName: string;
  eventClasses: any[] = [];
  constructor(private es: AppEventBus) {
    super(es);
  }

  public groupIdPrefix: string = "";

  setDomainName(domainName: string) {
    new KafkaBroker({ groupId: this.groupIdPrefix + domainName }, true);
    this.domainName = domainName;
  }

  publish<T extends IEvent>(event: T) {
    const broker = new KafkaBroker(
      { groupId: this.groupIdPrefix + this.domainName },
      true
    );
    let routing = "";
    const aggregateId = (event as any).aggregateId;
    if ((event as any).constructor.aggregateName) {
      const aggregateName = (event as any).constructor.aggregateName;

      routing = `events.aggregate.${aggregateName}`;
    } else if ((event as any).constructor.domainName) {
      const domainName = (event as any).constructor.domainName;
      routing = `events.domain.${domainName}.${event.constructor.name}`;
    }

    broker.publish(
      PREFIX + routing,
      {
        aggregateId: aggregateId || null,
        type: event.constructor.name,
        data: event,
      },
      aggregateId || null
    );
  }

  bridgeEventsTo<T extends IEvent>(subject: Subject<T>) {
    const broker = new KafkaBroker(
      { groupId: this.groupIdPrefix + this.domainName },
      true
    );
    const topicsCallbacks: {
      [topic: string]: ((msg: any) => any)[];
    } = {};
    this.eventClasses.forEach(async (EventClass) => {
      const onEvent = (msg) => {
        // Await or not await ? TODO make concurrent feature optional!
        /*       console.log(this.domainName);
        console.log(msg);
        console.log(msg.type);
        console.log(EventClass.name); */
        if (msg.type === EventClass.name) {
          const obj = new EventClass();
          return new Promise((resolve, reject) => {
            subject.next(
              Object.setPrototypeOf(
                { ...msg.data, __promise: { resolve, reject } },
                obj
              )
            );
          });
        }
      };

      if (EventClass.domainName) {
        const topic =
          PREFIX + `events.domain.${EventClass.domainName}.${EventClass.name}`;
        if (topicsCallbacks[topic]) {
          topicsCallbacks[topic].push(onEvent);
        } else {
          topicsCallbacks[topic] = [onEvent];
          broker.subscribeTo(topic, async (message) => {
            await Promise.all(
              topicsCallbacks[topic].map(async (cb) => {
                await cb(message);
              })
            );
          });
        }
      } else if (EventClass.aggregateName) {
        const topic = PREFIX + `events.aggregate.${EventClass.aggregateName}`;
        if (topicsCallbacks[topic]) {
          topicsCallbacks[topic].push(onEvent);
        } else {
          topicsCallbacks[topic] = [onEvent];
          broker.subscribeTo(topic, async (message) => {
            await Promise.all(
              topicsCallbacks[topic].map(async (cb) => await cb(message))
            );
          });
        }
      }
    });
  }

  public registerEvents(eventClasses: any[]) {
    this.eventClasses = eventClasses;
  }

  mergeClassContext(metatype): any {
    const eventBus = this.es;
    return class extends metatype {
      publish(event) {
        eventBus.publish(event);
      }
    };
  }
  mergeObjectContext(object) {
    const eventBus = this.es;
    object.publish = (event) => {
      eventBus.publish(event);
    };
    return object;
  }
}
