import { OnModuleInit } from "@nestjs/common";
import { AppCommandBus } from "@marvel/infrastructure";
import { SyncStatusRepository } from "./repositories/sync-status-repository";
import { MarvelApi } from "./apis/marvel.api";
export declare class MarvelComicsCronService implements OnModuleInit {
    private commandBus;
    private syncStatusRepository;
    private marvelApi;
    private logger;
    private loading;
    constructor(commandBus: AppCommandBus, syncStatusRepository: SyncStatusRepository, marvelApi: MarvelApi);
    onModuleInit(): void;
    handleCron(): Promise<void>;
}
