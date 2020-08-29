"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaConfig = exports.defaultReplyConsumerconfig = exports.defaultConsumerConfig = exports.defaultClientConfig = exports.defaultCommandTopic = exports.defaultRequestTopic = exports.defaultReplyTopic = exports.defaultEventTopicConfig = void 0;
const uuid_1 = require("uuid");
exports.defaultEventTopicConfig = (name) => ({
    topic: name,
    numPartitions: 30,
    replicationFactor: 1,
    configEntries: [{ name: "retention.ms", value: "-1" }],
});
exports.defaultReplyTopic = (name) => ({
    topic: name,
    numPartitions: 1,
    replicationFactor: 1,
    configEntries: [{ name: "retention.ms", value: "0" }],
});
exports.defaultRequestTopic = (name) => ({
    topic: name,
    numPartitions: 30,
    replicationFactor: 1,
    configEntries: [{ name: "retention.ms", value: "0" }],
});
exports.defaultCommandTopic = (name) => ({
    topic: name,
    numPartitions: 5,
    replicationFactor: 1,
    configEntries: [{ name: "retention.ms", value: "86400000" }],
});
exports.defaultClientConfig = {
    "client.id": "kafka-admin",
    "metadata.broker.list": process.env.KAFKA_BROKER_LIST || "localhost:9092",
};
exports.defaultConsumerConfig = (groupId) => ({
    groupId: groupId + "-kafkajs-v2",
    maxBytesPerPartition: 10,
});
exports.defaultReplyConsumerconfig = () => ({
    groupId: uuid_1.v1(),
});
exports.kafkaConfig = {
    brokers: process.env.KAFKA_BROKER_LIST
        ? process.env.KAFKA_BROKER_LIST.split(",")
        : ["localhost:9092"],
    clientId: "app",
};
//# sourceMappingURL=default-config.js.map