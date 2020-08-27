import { AppCommandBus, AppQueryBus } from "@marvel/infrastructure";
export declare class WebGatewayModule {
    private readonly command$;
    private readonly appQueryBus;
    constructor(command$: AppCommandBus, appQueryBus: AppQueryBus);
}
