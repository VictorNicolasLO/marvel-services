import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import { CreateComicCommand } from "../impl/create-comic.command";
import { ComicsRepository } from "../../repositories/comics.repository";
import { ComicCreatedEvent } from "../../events/domain/comic-created.event";
import { BadRequestException } from "@nestjs/common";
import { AppEventBus } from "@marvel/infrastructure";

@CommandHandler(CreateComicCommand)
export class CreateComicHandler implements ICommandHandler<CreateComicCommand> {
  constructor(
    private readonly eventBus: AppEventBus,
    private readonly repository: ComicsRepository
  ) {}

  async execute(command: CreateComicCommand) {
    const comic = await this.repository.create(command.comicDto);
    const comicDto = comic.toDto();
    this.eventBus.publish(new ComicCreatedEvent(comicDto));
    return comicDto;
  }
}
