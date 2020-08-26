import { ICommandHandler, EventBus } from "@nestjs/cqrs";
import { CreateComicCommand } from "../impl/create-comic.command";
import { ComicsRepository } from "../../repositories/comics.repository";
export declare class CreateComicHandler implements ICommandHandler<CreateComicCommand> {
    private readonly eventBus;
    private readonly repository;
    constructor(eventBus: EventBus, repository: ComicsRepository);
    execute(command: CreateComicCommand): Promise<import("../../models/interfaces/icomic").IComic & {
        id: string;
    }>;
}
