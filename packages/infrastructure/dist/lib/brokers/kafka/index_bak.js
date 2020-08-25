"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaBroker = void 0;
const kafkajs_1 = require("kafkajs");
const rpc_1 = require("./rpc");
const subscriber_1 = require("./subscriber");
const default_config_1 = require("./default-config");
const kafka = new kafkajs_1.Kafka(default_config_1.kafkaConfig);
let instances = {};
class KafkaBroker {
    constructor(options, singleton) {
        this.options = options;
        this.createdTopics = {};
        this.subscribeToQueue = [];
        if (instances[options.groupId] && singleton)
            return instances[options.groupId];
        console.log('INNIT', options.groupId);
        this.init();
        instances[options.groupId] = this;
    }
    async init() {
        this.admin = kafka.admin();
        this.producer = kafka.producer();
        this.subscriber = new subscriber_1.Subscriber(kafka, this.admin, this.options.groupId);
        this.subscribeToQueue.forEach(args => {
            this.subscribeTo(...args);
        });
        this.kafkaRpc = new rpc_1.Rpc(kafka, this.admin, this.producer, this.subscriber);
        await this.admin.connect();
        await this.producer.connect();
        console.log(this.options.groupId);
        console.log('CONNECTED');
    }
    async request(topic, data) {
        return await this.kafkaRpc.request(topic, data);
    }
    rpc(topic, cb) {
        this.kafkaRpc.rpc(topic, cb);
    }
    subscribeTo(topic, cb) {
        if (this.subscriber)
            this.subscriber.subscribe(topic, ({ message: { value } }) => {
                cb(JSON.parse(value.toString('utf-8')));
            });
        else
            this.subscribeToQueue.push([topic, cb]);
    }
    async publish(topic, message, key) {
        const payload = {
            topic,
            messages: [{ value: JSON.stringify(message), key }],
        };
        if (this.createdTopics[topic]) {
            this.producer.send(payload);
        }
        else {
            await this.admin.createTopics({
                topics: [default_config_1.defaultEventTopicConfig(topic)],
            });
            this.producer.send(payload);
            this.createdTopics[topic] = true;
        }
    }
}
exports.KafkaBroker = KafkaBroker;
//# sourceMappingURL=index_bak.js.map