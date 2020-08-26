"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComicCreatedEvent = void 0;
const comic_aggregate_event_1 = require("../comic-aggregate-event");
class ComicCreatedEvent extends comic_aggregate_event_1.ComicAggregateEvent {
    constructor(aggregateId, comic) {
        super();
        this.aggregateId = aggregateId;
        this.comic = comic;
    }
}
exports.ComicCreatedEvent = ComicCreatedEvent;
//# sourceMappingURL=comic-created.event.js.map