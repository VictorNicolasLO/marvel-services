import { ICommandHandler } from "@nestjs/cqrs";
import { CreateComicCommand } from "../impl/create-comic.command";
import { ComicsRepository } from "../../repositories/comics.repository";
import { AppEventBus } from "@marvel/infrastructure";
export declare class CreateComicHandler implements ICommandHandler<CreateComicCommand> {
    private readonly eventBus;
    private readonly repository;
    constructor(eventBus: AppEventBus, repository: ComicsRepository);
    execute(command: CreateComicCommand): Promise<import("../../models/interfaces/icomic").IComic & {
        id: string;
    }>;
}
