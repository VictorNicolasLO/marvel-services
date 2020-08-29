"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const character_creator_aggregate_event_1 = require("../character-creator-aggregate-event");
class CharacterCreatorCreatedEvent extends character_creator_aggregate_event_1.CharacterCreatorAggregateEvent {
    constructor(aggregateId, characterCreator) {
        super();
        this.aggregateId = aggregateId;
        this.characterCreator = characterCreator;
    }
}
exports.CharacterCreatorCreatedEvent = CharacterCreatorCreatedEvent;
//# sourceMappingURL=character-creator-created.event.js.map