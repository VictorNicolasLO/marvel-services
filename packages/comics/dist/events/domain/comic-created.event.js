"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComicCreatedEvent = void 0;
const comics_domain_event_1 = require("../comics-domain-event");
class ComicCreatedEvent extends comics_domain_event_1.ComicsDomainEvent {
    constructor(comic) {
        super();
        this.comic = comic;
    }
}
exports.ComicCreatedEvent = ComicCreatedEvent;
//# sourceMappingURL=comic-created.event.js.map