"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rpc = void 0;
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const utils_1 = require("./utils");
class Rpc {
    constructor(client, groupId) {
        this.client = client;
        this.groupId = groupId;
        this.pendingResponses = {};
        this.producers = {};
        this.replyTopic = `reply-${uuid_1.v1()}`;
        this.init();
    }
    async init() {
        this.setupReplyConsumer();
    }
    async setupReplyConsumer() {
        await this.client.subscribe({
            topic: `non-persistent://public/default/${this.replyTopic}`,
            subscription: this.replyTopic,
            subscriptionType: 'Exclusive',
            ackTimeoutMs: 10000,
            listener: async (msg, msgConsumer) => {
                const { error, response, requestId } = JSON.parse(msg.getData().toString());
                const { timeoutId, resolve, reject } = this.pendingResponses[requestId];
                clearTimeout(timeoutId);
                if (!error)
                    resolve(response);
                else
                    reject(error);
                msgConsumer.acknowledge(msg);
            },
        });
    }
    async rpc(topic, cb) {
        await this.client.subscribe({
            topic: `non-persistent://public/default/${topic}`,
            subscription: this.groupId,
            subscriptionType: 'Shared',
            ackTimeoutMs: 10000,
            listener: async (msg, msgConsumer) => {
                const { data, replyTopic, requestId } = JSON.parse(msg.getData().toString());
                const replyProducer = await this.getProducer(replyTopic);
                try {
                    const response = await cb(data);
                    replyProducer.send({
                        data: utils_1.jsonToBuffer({
                            response,
                            requestId,
                        }),
                        eventTimestamp: Date.now(),
                    });
                }
                catch (e) {
                    replyProducer.send({
                        data: utils_1.jsonToBuffer({
                            error: e,
                            requestId,
                        }),
                        eventTimestamp: Date.now(),
                    });
                }
                msgConsumer.acknowledge(msg);
            },
        });
    }
    request(topic, data) {
        return new Promise(async (resolve, reject) => {
            const run = async () => {
                const requestId = uuid_1.v1();
                const rpcProducer = await this.getProducer(topic);
                rpcProducer.send({
                    data: utils_1.jsonToBuffer({
                        data,
                        replyTopic: this.replyTopic,
                        requestId,
                    }),
                    eventTimestamp: Date.now(),
                });
                const timeoutId = setTimeout(() => {
                    reject(new common_1.RequestTimeoutException(`Request time out for topic ${topic}`));
                }, process.env.REQUEST_TIME_OUT || 30000);
                this.pendingResponses[requestId] = { resolve, timeoutId, reject };
            };
            run();
        });
    }
    async getProducer(topic) {
        if (!this.producers[topic]) {
            this.producers[topic] = await this.client.createProducer({
                topic: `non-persistent://public/default/${topic}`,
                sendTimeoutMs: 30000,
                batchingEnabled: true,
            });
        }
        return this.producers[topic];
    }
}
exports.Rpc = Rpc;
//# sourceMappingURL=rpc.js.map