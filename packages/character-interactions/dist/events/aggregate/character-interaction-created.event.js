"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const character_interaction_aggregate_event_1 = require("../character-interaction-aggregate-event");
class CharacterInteractionCreatedEvent extends character_interaction_aggregate_event_1.CharacterInteractionAggregateEvent {
    constructor(aggregateId, characterInteraction) {
        super();
        this.aggregateId = aggregateId;
        this.characterInteraction = characterInteraction;
    }
}
exports.CharacterInteractionCreatedEvent = CharacterInteractionCreatedEvent;
//# sourceMappingURL=character-interaction-created.event.js.map