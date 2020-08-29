"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_1 = require("@nestjs/cqrs");
const create_comic_command_1 = require("../impl/create-comic.command");
const comics_repository_1 = require("../../repositories/comics.repository");
const comic_created_event_1 = require("../../events/domain/comic-created.event");
const common_1 = require("@nestjs/common");
const infrastructure_1 = require("@marvel/infrastructure");
let CreateComicHandler = class CreateComicHandler {
    constructor(eventBus, repository) {
        this.eventBus = eventBus;
        this.repository = repository;
    }
    async execute(command) {
        const comicExist = await this.repository.findOne({
            id: command.comicDto.id,
        });
        if (comicExist) {
            throw new common_1.BadRequestException(`Comic with id ${command.comicDto.id} already exist`);
        }
        const comic = await this.repository.create(command.comicDto);
        const comicDto = comic.toDto();
        this.eventBus.publish(new comic_created_event_1.ComicCreatedEvent(comicDto));
        return comicDto;
    }
};
CreateComicHandler = __decorate([
    cqrs_1.CommandHandler(create_comic_command_1.CreateComicCommand),
    __metadata("design:paramtypes", [infrastructure_1.AppEventBus,
        comics_repository_1.ComicsRepository])
], CreateComicHandler);
exports.CreateComicHandler = CreateComicHandler;
//# sourceMappingURL=create-comic.handler.js.map