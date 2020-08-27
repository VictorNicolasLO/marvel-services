export declare class KafkaBroker {
    private options;
    private createdTopics;
    private kafkaRpc;
    private admin;
    private producer;
    private subscriber;
    private subscribeToQueue;
    constructor(options: {
        groupId: string;
    }, singleton?: boolean);
    private init;
    request(topic: string, data: any, acks?: 0 | 1 | -1): Promise<unknown>;
    rpc(topic: string, cb: (message: any) => any): void;
    subscribeTo(topic: string, cb: (message: any) => Promise<void>): void;
    publish(topic: string, message: any, key: string): Promise<void>;
}
