import { AppQueryBus } from "@marvel/infrastructure";
export declare class CharactersController {
    private queryBus;
    constructor(queryBus: AppQueryBus);
    getCharacters(nameId: any): Promise<import("@nestjs/cqrs").IQueryResult>;
}
