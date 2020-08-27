"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const search_character_interaction_query_1 = require("../search-character-interaction.query");
class GetCharacterInteractionByNameQuery extends search_character_interaction_query_1.SearchCharacterInteractionQuery {
    constructor(name) {
        super();
        this.name = name;
    }
}
exports.GetCharacterInteractionByNameQuery = GetCharacterInteractionByNameQuery;
//# sourceMappingURL=get-character-interaction-by-name.query.js.map