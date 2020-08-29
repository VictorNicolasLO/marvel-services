import mongoose, { Schema, Model, Document } from "mongoose";
import { DbDriver, DbDriverOptions, IDbsession } from "./db-driver";
import { ClientSession } from "mongoose";

export class MongoDriver<T> extends DbDriver<T> {
  collection: Model<Document>;
  constructor(collection: string) {
    super();
    const customSchema = new Schema(
      {
        id: { String, unique: true, index: true },
      },
      {
        strict: false,
        id: false,
      }
    );
    this.collection = mongoose.model(collection, customSchema);
  }

  static db: typeof mongoose;

  static init(url: string) {
    mongoose
      .connect(url, (err) => {
        if (!err) {
          console.log("MONGO RUNNING");
        } else {
          console.log(err);
        }
      })
      .then((db) => {
        MongoDriver.db = db;
      });
  }

  async findOne(
    filter: Partial<T>,
    options: DbDriverOptions = {}
  ): Promise<T | null> {
    const operation = this.collection.findOne(filter);
    const result = await (options.session
      ? operation.session((options.session as unknown) as ClientSession)
      : operation);
    return result && result.toObject();
  }

  async findById(id: string, options: DbDriverOptions = {}): Promise<T | null> {
    const operation = this.collection.findOne({ id });
    const result = await (options.session
      ? operation.session((options.session as unknown) as ClientSession)
      : operation);
    return result && result.toObject();
  }

  async find(filter: Partial<T>): Promise<T[]> {
    // TODO TRANSACTION
    return (await this.collection.find(filter)).map((item) => item.toObject());
  }

  async insert(data: T, options: DbDriverOptions = {}): Promise<T> {
    return (await this.collection.create(data, options)) as any;
  }
  async update(filter: Partial<T>, data: Partial<T>): Promise<T> {
    // TODO TRANSACTION
    return await this.collection.update(filter, data);
  }
  async delete(data: Partial<T>): Promise<any> {
    // TODO TRANSACTION
    return await this.collection.deleteOne((data as any).id);
  }

  async transaction() {
    const session = await MongoDriver.db.startSession();
    return (session as unknown) as IDbsession;
  }
}
