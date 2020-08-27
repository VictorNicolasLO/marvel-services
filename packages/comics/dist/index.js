"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_comic_command_1 = require("./commands/impl/create-comic.command");
exports.CreateComicCommand = create_comic_command_1.CreateComicCommand;
var comic_created_event_1 = require("./events/aggregate/comic-created.event");
exports.ComicCreatedEventAggregate = comic_created_event_1.ComicCreatedEvent;
var comic_created_event_2 = require("./events/domain/comic-created.event");
exports.ComicCreatedEventDomain = comic_created_event_2.ComicCreatedEvent;
//# sourceMappingURL=index.js.map