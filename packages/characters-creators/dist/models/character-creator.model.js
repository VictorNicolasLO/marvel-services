"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const infrastructure_1 = require("@marvel/infrastructure");
const character_creator_created_event_1 = require("../events/aggregate/character-creator-created.event");
class CharacterCreatorModel extends infrastructure_1.Model {
    constructor(dto, options) {
        super(dto, options);
    }
    get role() {
        return this._role;
    }
    get characterId() {
        return this._characterId;
    }
    get creatorId() {
        return this._creatorId;
    }
    get character() {
        return this._character;
    }
    get creator() {
        return this._creator;
    }
    set role(value) {
        this._role = value;
    }
    set characterId(value) {
        this._characterId = value;
    }
    set creatorId(value) {
        this._creatorId = value;
    }
    set character(value) {
        this._character = value;
    }
    set creator(value) {
        this._creator = value;
    }
    create() {
        this.apply(new character_creator_created_event_1.CharacterCreatorCreatedEvent(this.id, this.toDto()));
    }
}
exports.CharacterCreatorModel = CharacterCreatorModel;
//# sourceMappingURL=character-creator.model.js.map