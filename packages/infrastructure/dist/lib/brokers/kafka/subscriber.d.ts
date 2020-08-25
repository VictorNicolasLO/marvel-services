import { Kafka, Admin, EachMessagePayload, ITopicConfig } from 'kafkajs';
export declare class Subscriber {
    private kafka;
    private kafkaClient;
    private groupId;
    private consumer;
    private callbacks;
    constructor(kafka: Kafka, kafkaClient: Admin, groupId: string);
    subscribe(topic: string, cb: (message: EachMessagePayload) => void, topicConfig?: ITopicConfig): Promise<void>;
    private setupConsumer;
    runConsumer(): Promise<void>;
}
