import { AppCommandBus } from "@marvel/infrastructure";
import { SyncStatusRepository } from "./repositories/sync-status-repository";
import { MarvelApi } from "./apis/marvel.api";
export declare class MarvelComicsCronService {
    private commandBus;
    private syncStatusRepository;
    private marvelApi;
    private logger;
    private loading;
    constructor(commandBus: AppCommandBus, syncStatusRepository: SyncStatusRepository, marvelApi: MarvelApi);
    handleCron(): Promise<void>;
}
