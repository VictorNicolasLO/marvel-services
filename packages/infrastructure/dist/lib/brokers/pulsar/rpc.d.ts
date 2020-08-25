import { Client } from 'pulsar-client';
export declare class Rpc {
    private client;
    private groupId;
    private pendingResponses;
    private replyTopic;
    private producers;
    constructor(client: Client, groupId: string);
    private init;
    private setupReplyConsumer;
    rpc(topic: string, cb: (data: any) => any): Promise<void>;
    request(topic: string, data: any): Promise<unknown>;
    getProducer(topic: string): Promise<any>;
}
