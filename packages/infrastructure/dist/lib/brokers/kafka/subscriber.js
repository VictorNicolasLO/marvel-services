"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
const default_config_1 = require("./default-config");
class Subscriber {
    constructor(kafka, kafkaClient, groupId) {
        this.kafka = kafka;
        this.kafkaClient = kafkaClient;
        this.groupId = groupId;
        this.callbacks = {};
        this.setupConsumer();
        setTimeout(() => {
            this.runConsumer();
        }, 5000);
    }
    async subscribe(topic, cb, topicConfig) {
        await this.kafkaClient.createTopics({
            topics: [topicConfig || default_config_1.defaultEventTopicConfig(topic)],
        });
        if (!this.callbacks[topic]) {
            this.callbacks[topic] = [cb];
            console.log("TOPIC ADDED", topic);
            await this.consumer.subscribe({
                topic,
                fromBeginning: true,
            });
        }
        else {
            this.callbacks[topic].push(cb);
        }
    }
    async setupConsumer() {
        this.consumer = this.kafka.consumer(default_config_1.defaultConsumerConfig(this.groupId));
        await this.consumer.connect();
        this.consumer.on("consumer.crash", (error) => {
            throw error;
        });
        console.log("CONSUMER CONNECTED");
    }
    async runConsumer() {
        console.log("CONSUMER RUNNING");
        await this.consumer.run({
            autoCommit: true,
            partitionsConsumedConcurrently: 1000,
            eachMessage: async (message) => {
                console.log("New message incoming");
                console.log(message.partition, message.topic);
                await Promise.all(this.callbacks[message.topic].map(async (cb) => {
                    return await cb(message);
                }));
                console.log("FINISH");
            },
        });
    }
}
exports.Subscriber = Subscriber;
//# sourceMappingURL=subscriber.js.map