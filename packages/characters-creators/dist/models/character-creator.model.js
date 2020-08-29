"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const infrastructure_1 = require("@marvel/infrastructure");
const character_creator_created_event_1 = require("../events/aggregate/character-creator-created.event");
class CharacterCreatorModel extends infrastructure_1.Model {
    constructor(dto, options) {
        super(dto, options);
    }
    create() {
        this.apply(new character_creator_created_event_1.CharacterCreatorCreatedEvent(this.id, this.toDto()));
    }
}
exports.CharacterCreatorModel = CharacterCreatorModel;
//# sourceMappingURL=character-creator.model.js.map