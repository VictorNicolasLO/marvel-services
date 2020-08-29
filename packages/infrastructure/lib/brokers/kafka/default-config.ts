import { v1 as uuid } from "uuid";
import { KafkaConfig, ITopicConfig, ConsumerConfig } from "kafkajs";

export const defaultEventTopicConfig = (name: string): ITopicConfig => ({
  topic: name,
  numPartitions: 30,
  replicationFactor: 1,
  configEntries: [{ name: "retention.ms", value: "-1" }],
});

export const defaultReplyTopic = (name: string): ITopicConfig => ({
  topic: name,
  numPartitions: 1,
  replicationFactor: 1,
  configEntries: [{ name: "retention.ms", value: "0" }],
});

export const defaultRequestTopic = (name: string): ITopicConfig => ({
  topic: name,
  numPartitions: 30,
  replicationFactor: 1,
  configEntries: [{ name: "retention.ms", value: "0" }],
});

export const defaultCommandTopic = (name: string): ITopicConfig => ({
  topic: name,
  numPartitions: 30,
  replicationFactor: 1,
  configEntries: [{ name: "retention.ms", value: "86400000" }],
});

export const defaultClientConfig = {
  "client.id": "kafka-admin",
  "metadata.broker.list": process.env.KAFKA_BROKER_LIST || "localhost:9092",
};

export const defaultConsumerConfig = (groupId: string): ConsumerConfig => ({
  groupId: groupId + "-kafkajs-v2",
  maxBytesPerPartition: 1000,
});

export const defaultReplyConsumerconfig = (): ConsumerConfig => ({
  groupId: uuid(),
  maxBytesPerPartition: 2147483647,
  maxBytes: 2147483647,
});

// -----------------

export const kafkaConfig: KafkaConfig = {
  brokers: process.env.KAFKA_BROKER_LIST
    ? process.env.KAFKA_BROKER_LIST.split(",")
    : ["localhost:9092"],
  clientId: "app",
};
