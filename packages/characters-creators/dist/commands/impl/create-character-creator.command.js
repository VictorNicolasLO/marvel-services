"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const character_creators_command_1 = require("../character-creators-command");
class CreateCharacterCreatorCommand extends character_creators_command_1.CharacterCreatorCommand {
    constructor(characterCreatorDto) {
        super();
        this.characterCreatorDto = characterCreatorDto;
    }
}
exports.CreateCharacterCreatorCommand = CreateCharacterCreatorCommand;
//# sourceMappingURL=create-character-creator.command.js.map