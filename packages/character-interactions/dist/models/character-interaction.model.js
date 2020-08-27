"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const infrastructure_1 = require("@marvel/infrastructure");
const character_interaction_created_event_1 = require("../events/aggregate/character-interaction-created.event");
class CharacterInteractionModel extends infrastructure_1.Model {
    constructor(dto, options) {
        super(dto, options);
    }
    get characters() {
        return this._characters;
    }
    get comic() {
        return this._comic;
    }
    set characters(value) {
        infrastructure_1.Model.assertProp(value.length == 2, "Max 2 characters per interaction");
        this._characters = value;
    }
    set comic(value) {
        infrastructure_1.Model.assertProp(!!value.image && !!value.title && !!value.id, "Object should contain id, image and title as string");
        this._comic = value;
    }
    create() {
        this.apply(new character_interaction_created_event_1.CharacterInteractionCreatedEvent(this.id, this.toDto()));
    }
}
exports.CharacterInteractionModel = CharacterInteractionModel;
//# sourceMappingURL=character-interaction.model.js.map