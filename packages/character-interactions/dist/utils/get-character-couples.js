"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCharacterCouples(characters) {
    return characters.map((character, index) => characters
        .filter((ch, chIndex) => ch.id !== character.id && chIndex < index)
        .map((characterMate) => [character, characterMate]));
}
exports.getCharacterCouples = getCharacterCouples;
//# sourceMappingURL=get-character-couples.js.map