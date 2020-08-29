"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rpc = void 0;
const uuid_1 = require("uuid");
const default_config_1 = require("./default-config");
const common_1 = require("@nestjs/common");
class Rpc {
    constructor(kafka, kafkaClient, producer, subscriber) {
        this.kafka = kafka;
        this.kafkaClient = kafkaClient;
        this.producer = producer;
        this.subscriber = subscriber;
        this.pendingResponses = {};
        this.createdTopics = {};
        this.init();
    }
    async init() {
        this.replyTopic = `reply.${uuid_1.v1()}`;
        await this.kafkaClient.createTopics({
            topics: [default_config_1.defaultReplyTopic(this.replyTopic)],
        });
        this.setupReplyConsumer();
        process.on("exit", async () => {
            this.consumer.disconnect();
            await this.kafkaClient.deleteTopics({ topics: [this.replyTopic] });
            console.log("Goodbye!");
        });
    }
    async setupReplyConsumer() {
        this.consumer = this.kafka.consumer(default_config_1.defaultReplyConsumerconfig());
        await this.consumer.connect();
        this.consumer.on("consumer.crash", (error) => {
            throw error;
        });
        await this.consumer.subscribe({
            topic: this.replyTopic,
        });
        await this.consumer.run({
            autoCommit: true,
            eachMessage: async (message) => {
                const { message: { value }, } = message;
                const { error, response, requestId } = JSON.parse(value.toString("utf-8"));
                const { timeoutId, resolve, reject } = this.pendingResponses[requestId];
                clearTimeout(timeoutId);
                if (!error)
                    resolve(response);
                else
                    reject(error);
            },
        });
    }
    rpc(topic, cb) {
        const isQuery = topic.startsWith("queries");
        const proccess = async (payload) => {
            const { data, replyTopic, requestId } = JSON.parse(payload.message.value.toString("utf-8"));
            try {
                const response = await cb(data);
                const responsePayload = {
                    topic: replyTopic,
                    messages: [
                        {
                            value: JSON.stringify({
                                response,
                                requestId,
                            }),
                        },
                    ],
                    acks: 0,
                };
                await this.producer.send(responsePayload);
            }
            catch (e) {
                console.log(e);
                await this.producer.send({
                    topic: replyTopic,
                    messages: [
                        {
                            value: JSON.stringify({
                                error: e,
                                requestId,
                            }),
                        },
                    ],
                    acks: 0,
                });
            }
        };
        this.subscriber.subscribe(topic, isQuery
            ? (paylpad) => {
                proccess(paylpad).then();
            }
            : proccess, topic.startsWith("command")
            ? default_config_1.defaultCommandTopic(topic)
            : default_config_1.defaultRequestTopic(topic));
    }
    request(topic, data, acks) {
        return new Promise(async (resolve, reject) => {
            const run = async () => {
                const requestId = uuid_1.v1();
                await this.producer.send({
                    topic,
                    messages: [
                        {
                            value: JSON.stringify({
                                data,
                                replyTopic: this.replyTopic,
                                requestId,
                            }),
                        },
                    ],
                    acks,
                });
                const timeoutId = setTimeout(() => {
                    reject(new common_1.RequestTimeoutException(`Request time out for topic ${topic}`));
                }, process.env.REQUEST_TIME_OUT || 30000);
                this.pendingResponses[requestId] = { resolve, timeoutId, reject };
            };
            if (this.createdTopics[topic]) {
                run();
            }
            else {
                console.log(topic);
                await this.kafkaClient.createTopics({
                    topics: [
                        topic.startsWith("command")
                            ? default_config_1.defaultRequestTopic(topic)
                            : default_config_1.defaultRequestTopic(topic),
                    ],
                });
                run();
                this.createdTopics[topic] = true;
            }
        });
    }
}
exports.Rpc = Rpc;
//# sourceMappingURL=rpc.js.map