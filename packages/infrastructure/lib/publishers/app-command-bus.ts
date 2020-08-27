import { CommandBus, ICommand } from "@nestjs/cqrs";
import { ModuleRef } from "@nestjs/core";
import { Injectable, Logger, HttpException } from "@nestjs/common";
import { KafkaBroker } from "../brokers/kafka";
const PREFIX = process.env.BROKER_PREFIX || "";
@Injectable()
export class AppCommandBus extends CommandBus {
  constructor(moduleRef: ModuleRef) {
    super(moduleRef);
  }

  private _domainName: string;
  set domainName(value: string) {
    new KafkaBroker({ groupId: this.groupIdPrefix + value }, true);
    this._domainName = value;
  }
  get domainName() {
    return this._domainName;
  }

  public groupIdPrefix: string = "";

  async execute<T extends ICommand>(command: T): Promise<any> {
    console.log(this.domainName);
    const broker = new KafkaBroker(
      { groupId: this.groupIdPrefix + this.domainName },
      true
    );
    const domainName = (command.constructor as any).domainName;
    const commandName = command.constructor.name;
    try {
      const result: any = await broker.request(
        PREFIX + `commands.${domainName}.${commandName}`,
        { data: command },
        -1
      );
      return result;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  bind(handler, name) {
    const broker = new KafkaBroker(
      { groupId: this.groupIdPrefix + this.domainName },
      true
    );
    broker.rpc(
      PREFIX + `commands.${this.domainName}.${name}`,
      (msg: any) =>
        new Promise(async (resolve, reject) => {
          //  this.subject$.next(msg.data);
          try {
            const result = await handler.execute(msg.data);
            resolve(result);
          } catch (e) {
            Logger.error(e.message, e.trace, "RPC consumer reponse");
            reject(e);
            throw e;
          }
        })
    );
  }

  async registerHandler(handler) {
    const instance = await (this as any).moduleRef.resolve(handler);
    if (!instance) {
      return;
    }
    const target = (this as any).reflectCommandName(handler);
    if (!target) {
      throw "INVALID COMMAND TYPE";
    }
    this.bind(instance, target.name);
  }
}
