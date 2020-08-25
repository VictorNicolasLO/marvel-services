export declare class PulsarBroker {
    private options;
    private pulsarRpc;
    private producers;
    private groupId;
    constructor(options: {
        groupId: string;
    }, singleton?: boolean);
    private init;
    request(topic: string, data: any): Promise<unknown>;
    rpc(topic: string, cb: (message: any) => any): void;
    subscribeTo(topic: string, cb: (message: any) => Promise<void>): Promise<void>;
    publish(topic: string, message: any, key: string): Promise<void>;
}
