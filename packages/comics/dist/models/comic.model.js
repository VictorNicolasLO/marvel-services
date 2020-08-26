"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComicModel = void 0;
const infrastructure_1 = require("@marvel/infrastructure");
const comic_created_event_1 = require("../events/aggregate/comic-created.event");
class ComicModel extends infrastructure_1.Model {
    constructor(dto, options) {
        super(dto, options);
    }
    get title() {
        return this._title;
    }
    get image() {
        return this._image;
    }
    get characters() {
        return this._characters;
    }
    get creators() {
        return this._creators;
    }
    set title(value) {
        ComicModel.assertProp(value && typeof value === "string", "title value must be a string");
        this._title = value;
    }
    set image(value) {
        ComicModel.assertProp(value && typeof value === "string", "image value must be a string");
        this._image = value;
    }
    set characters(value) {
        ComicModel.assertProp(value && Array.isArray(value), "characters value must be an array");
        this._characters = value;
    }
    set creators(value) {
        ComicModel.assertProp(value && Array.isArray(value), "creators value must be an array");
        this._creators = value;
    }
    create() {
        this.apply(new comic_created_event_1.ComicCreatedEvent(this.id, this.toDto()));
    }
}
exports.ComicModel = ComicModel;
//# sourceMappingURL=comic.model.js.map