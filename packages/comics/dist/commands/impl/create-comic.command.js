"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateComicCommand = void 0;
const comics_command_1 = require("../comics-command");
class CreateComicCommand extends comics_command_1.ComicsCommand {
    constructor(comicDto) {
        super();
        this.comicDto = comicDto;
    }
}
exports.CreateComicCommand = CreateComicCommand;
//# sourceMappingURL=create-comic.command.js.map