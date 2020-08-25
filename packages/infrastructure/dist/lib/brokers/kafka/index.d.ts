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
    request(topic: string, data: any): Promise<unknown>;
    rpc(topic: string, cb: (message: any) => any): void;
    subscribeTo(topic: string, cb: (message: any) => void): void;
    publish(topic: string, message: any, key: string): Promise<void>;
}
