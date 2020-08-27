"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const character_interaction_command_1 = require("../character-interaction-command");
class CreateCharacterInteractionCommand extends character_interaction_command_1.ComicsCommand {
    constructor(characterInteractionDto) {
        super();
        this.characterInteractionDto = characterInteractionDto;
    }
}
exports.CreateCharacterInteractionCommand = CreateCharacterInteractionCommand;
//# sourceMappingURL=create-character-interaction.command.js.map