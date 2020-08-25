"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PulsarBroker = void 0;
const pulsar_client_1 = require("pulsar-client");
const rpc_1 = require("./rpc");
const client = new pulsar_client_1.Client({
    serviceUrl: process.env.PULSAR_URL || 'pulsar://localhost:6650',
    operationTimeoutSeconds: 30,
    ioThreads: 100,
    messageListenerThreads: 100,
});
let instances = {};
class PulsarBroker {
    constructor(options, singleton) {
        this.options = options;
        this.producers = {};
        if (instances[options.groupId] && singleton)
            return instances[options.groupId];
        console.log('INNIT', options.groupId);
        this.groupId = options.groupId;
        this.init();
        instances[options.groupId] = this;
    }
    init() {
        this.pulsarRpc = new rpc_1.Rpc(client, this.groupId);
    }
    async request(topic, data) {
        return await this.pulsarRpc.request(topic, data);
    }
    rpc(topic, cb) {
        this.pulsarRpc.rpc(topic, cb);
    }
    async subscribeTo(topic, cb) {
        await client.subscribe(Object.assign(Object.assign({ topic: `persistent://public/default/${topic}`, subscription: this.groupId, subscriptionType: 'KeyShared', ackTimeoutMs: 10000 }, { subscriptionInitialPosition: 'Earliest' }), { listener: async (msg, msgConsumer) => {
                try {
                    await cb(JSON.parse(msg.getData().toString()));
                    msgConsumer.acknowledge(msg);
                }
                catch (e) {
                    msgConsumer.negativeAcknowledge(msg);
                }
            } }));
    }
    async publish(topic, message, key) {
        if (!this.producers[topic]) {
            this.producers[topic] = await client.createProducer({
                topic: `persistent://public/default/${topic}`,
                sendTimeoutMs: 30000,
                batchingEnabled: true,
                hashingScheme: 'Murmur3_32Hash',
            });
        }
        this.producers[topic].send({
            data: Buffer.from(JSON.stringify(message)),
            partitionKey: key,
            eventTimestamp: Date.now(),
        });
    }
}
exports.PulsarBroker = PulsarBroker;
//# sourceMappingURL=index.js.map