import { KafkaConfig, ITopicConfig, ConsumerConfig } from "kafkajs";
export declare const defaultEventTopicConfig: (name: string) => ITopicConfig;
export declare const defaultReplyTopic: (name: string) => ITopicConfig;
export declare const defaultRequestTopic: (name: string) => ITopicConfig;
export declare const defaultClientConfig: {
    "client.id": string;
    "metadata.broker.list": string;
};
export declare const defaultConsumerConfig: (groupId: string) => ConsumerConfig;
export declare const defaultConsumerSubscriberConfig: (groupId: string) => ConsumerConfig;
export declare const defaultReplyConsumerconfig: () => ConsumerConfig;
export declare const kafkaConfig: KafkaConfig;
