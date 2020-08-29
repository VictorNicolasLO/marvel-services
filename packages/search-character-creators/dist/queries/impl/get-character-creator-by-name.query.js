"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCharacterCreatorByNameQuery = void 0;
const search_character_creator_query_1 = require("../search-character-creator.query");
class GetCharacterCreatorByNameQuery extends search_character_creator_query_1.SearchCharacterCreatorQuery {
    constructor(name) {
        super();
        this.name = name;
    }
}
exports.GetCharacterCreatorByNameQuery = GetCharacterCreatorByNameQuery;
//# sourceMappingURL=get-character-creator-by-name.query.js.map