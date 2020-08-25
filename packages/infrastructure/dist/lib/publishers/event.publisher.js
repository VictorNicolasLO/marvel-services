"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppEventPublisher = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const kafka_1 = require("../brokers/kafka");
const PREFIX = process.env.BROKER_PREFIX || "";
let AppEventPublisher = class AppEventPublisher extends cqrs_1.EventPublisher {
    constructor(es) {
        super(es);
        this.es = es;
        this.eventClasses = [];
    }
    setDomainName(domainName) {
        new kafka_1.KafkaBroker({ groupId: domainName }, true);
        this.domainName = domainName;
    }
    publish(event) {
        const broker = new kafka_1.KafkaBroker({ groupId: this.domainName }, true);
        let routing = '';
        const aggregateId = event.aggregateId;
        if (event.constructor.aggregateName) {
            const aggregateName = event.constructor.aggregateName;
            routing = `events.aggregate.${aggregateName}`;
        }
        else if (event.constructor.domainName) {
            const domainName = event.constructor.domainName;
            routing = `events.domain.${domainName}.${event.constructor.name}`;
        }
        broker.publish(PREFIX + routing, {
            aggregateId: aggregateId || null,
            type: event.constructor.name,
            data: event,
        }, aggregateId || null);
    }
    bridgeEventsTo(subject) {
        const broker = new kafka_1.KafkaBroker({ groupId: this.domainName }, true);
        const topicsCallbacks = {};
        this.eventClasses.forEach(async (EventClass) => {
            const onEvent = async (msg) => {
                console.log(this.domainName);
                console.log(msg);
                console.log(msg.type);
                console.log(EventClass.name);
                if (msg.type === EventClass.name) {
                    const obj = new EventClass();
                    await subject.next(Object.setPrototypeOf(msg.data, obj));
                }
            };
            if (EventClass.domainName) {
                const topic = PREFIX + `events.domain.${EventClass.domainName}.${EventClass.name}`;
                if (topicsCallbacks[topic]) {
                    topicsCallbacks[topic].push(onEvent);
                }
                else {
                    topicsCallbacks[topic] = [onEvent];
                    broker.subscribeTo(topic, async (message) => topicsCallbacks[topic].forEach((cb) => cb(message)));
                }
            }
            else if (EventClass.aggregateName) {
                const topic = PREFIX + `events.aggregate.${EventClass.aggregateName}`;
                if (topicsCallbacks[topic]) {
                    topicsCallbacks[topic].push(onEvent);
                }
                else {
                    topicsCallbacks[topic] = [onEvent];
                    broker.subscribeTo(topic, async (message) => topicsCallbacks[topic].forEach((cb) => cb(message)));
                }
            }
        });
    }
    registerEvents(eventClasses) {
        this.eventClasses = eventClasses;
    }
};
AppEventPublisher = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [cqrs_1.EventBus])
], AppEventPublisher);
exports.AppEventPublisher = AppEventPublisher;
//# sourceMappingURL=event.publisher.js.map