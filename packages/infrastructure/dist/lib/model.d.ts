import { AggregateRoot } from "@nestjs/cqrs";
declare type BasicModel = {
    id: string;
};
export declare type ModelOptions = {
    isInRepository: boolean;
};
export declare abstract class Model<T> extends AggregateRoot {
    update?(data: Partial<T>): void;
    create?(): void;
    delete?(): void;
    __isInRepository: boolean;
    protected _id: string;
    constructor(dto: T, options?: ModelOptions);
    static assertProp: (value: boolean, message?: string) => void;
    set id(value: string);
    get id(): string;
    fromDto(dto: any): void;
    toDto(): T & BasicModel;
    protected updateModel(data: Partial<T>): void;
    toObject(): T & BasicModel;
}
export {};
