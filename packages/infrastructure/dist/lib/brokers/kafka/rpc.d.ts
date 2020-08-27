import { Kafka, Admin, Producer } from "kafkajs";
import { Subscriber } from "./subscriber";
export declare class Rpc {
    private kafka;
    private kafkaClient;
    private producer;
    private subscriber;
    private consumer;
    private pendingResponses;
    private createdTopics;
    private replyTopic;
    constructor(kafka: Kafka, kafkaClient: Admin, producer: Producer, subscriber: Subscriber);
    private init;
    private setupReplyConsumer;
    rpc(topic: string, cb: (data: any) => any): void;
    request(topic: string, data: any, acks: 0 | 1 | -1): Promise<unknown>;
}
