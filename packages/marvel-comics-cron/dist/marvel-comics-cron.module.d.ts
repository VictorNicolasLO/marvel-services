import { AppCommandBus, AppQueryBus } from '@marvel/infrastructure';
export declare class MarvelComicsCronModule {
    private readonly command$;
    private readonly appQueryBus;
    constructor(command$: AppCommandBus, appQueryBus: AppQueryBus);
}
