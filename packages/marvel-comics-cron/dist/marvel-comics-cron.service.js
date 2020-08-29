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
var MarvelComicsCronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const infrastructure_1 = require("@marvel/infrastructure");
const sync_status_repository_1 = require("./repositories/sync-status-repository");
const marvel_api_1 = require("./apis/marvel.api");
const comics_1 = require("@marvel/comics");
const extract_id_from_url_1 = require("./utils/extract-id-from-url");
const BATCH_NUMBER = 100;
const CAPTAIN_AMERICA_ID = 1009220;
const IRON_MAN_ID = 1009368;
const CHARACTERS = `${IRON_MAN_ID},${CAPTAIN_AMERICA_ID}`;
let MarvelComicsCronService = MarvelComicsCronService_1 = class MarvelComicsCronService {
    constructor(commandBus, syncStatusRepository, marvelApi) {
        this.commandBus = commandBus;
        this.syncStatusRepository = syncStatusRepository;
        this.marvelApi = marvelApi;
        this.logger = new common_1.Logger(MarvelComicsCronService_1.name);
        this.loading = false;
    }
    onModuleInit() {
        this.handleCron();
    }
    async handleCron() {
        this.logger.log("Try job");
        if (!this.loading) {
            this.loading = true;
            this.logger.log("Start job");
            const status = (await this.syncStatusRepository.get("status")) || {
                lastOffset: 0,
            };
            let offset = status.lastOffset;
            let result;
            do {
                this.logger.log(`Batch LIMIT: ${BATCH_NUMBER}, OFFSET: ${offset}`);
                result = await this.marvelApi.getComics({
                    limit: BATCH_NUMBER,
                    offset,
                    orderBy: "onsaleDate",
                    characters: CHARACTERS,
                });
                console.log(result);
                result.data.results.forEach((comic) => {
                    this.commandBus
                        .execute(new comics_1.CreateComicCommand({
                        id: comic.id.toString(),
                        title: comic.title,
                        image: `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`,
                        characters: comic.characters.items.map((character) => ({
                            id: extract_id_from_url_1.extractIdFromUrl(character.resourceURI),
                            name: character.name,
                        })),
                        creators: comic.creators.items.map((creator) => ({
                            id: extract_id_from_url_1.extractIdFromUrl(creator.resourceURI),
                            name: creator.name,
                            role: creator.role,
                        })),
                    }))
                        .catch(() => { });
                });
                offset += result.data.count + 1;
                await this.syncStatusRepository.put("status", { lastOffset: offset });
            } while (result.data.count > 0);
            this.loading = false;
        }
        else {
            this.logger.warn("Job already in progress");
        }
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarvelComicsCronService.prototype, "handleCron", null);
MarvelComicsCronService = MarvelComicsCronService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [infrastructure_1.AppCommandBus,
        sync_status_repository_1.SyncStatusRepository,
        marvel_api_1.MarvelApi])
], MarvelComicsCronService);
exports.MarvelComicsCronService = MarvelComicsCronService;
//# sourceMappingURL=marvel-comics-cron.service.js.map