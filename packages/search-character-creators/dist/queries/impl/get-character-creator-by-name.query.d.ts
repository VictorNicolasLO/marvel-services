import { SearchCharacterCreatorQuery } from "../search-character-creator.query";
export declare class GetCharacterCreatorByNameQuery extends SearchCharacterCreatorQuery {
    name: string;
    constructor(name: string);
}
