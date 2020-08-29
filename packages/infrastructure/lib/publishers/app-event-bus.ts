import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { AppCommandBus } from "./app-command-bus";
import { ModuleRef } from "@nestjs/core";

@Injectable()
export class AppEventBus extends EventBus {
  constructor(commandBus: AppCommandBus, moduleRef: ModuleRef) {
    super(commandBus, moduleRef);
  }

  public subject$;
  bind(handler, name) {
    const stream$ = name ? this.ofEventName(name) : this.subject$;
    const subscription = stream$.subscribe(async (event) => {
      try {
        event.__promise.resolve(await handler.handle(event));
      } catch (e) {
        event.__promise.reject(e);
      }
    });
    (this as any).subscriptions.push(subscription);
  }
  publish(event) {
    this.publisher.publish(event);
  }
}
