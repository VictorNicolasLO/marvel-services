import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { AppCommandBus } from "@marvel/infrastructure";
import { SyncStatusRepository } from "./repositories/sync-status-repository";
import { MarvelApi } from "./apis/marvel.api";
import { GetComicsResult } from "./apis/marvel.api.types";
import { CreateComicCommand } from "@marvel/comics";
import { extractIdFromUrl } from "./utils/extract-id-from-url";

const BATCH_NUMBER = 100;
const CAPTAIN_AMERICA_ID = 1009220;
const IRON_MAN_ID = 1009368;
const CHARACTERS = `${IRON_MAN_ID},${CAPTAIN_AMERICA_ID}`;
@Injectable()
export class MarvelComicsCronService {
  private logger = new Logger(MarvelComicsCronService.name);
  private loading = false;
  constructor(
    private commandBus: AppCommandBus,
    private syncStatusRepository: SyncStatusRepository,
    private marvelApi: MarvelApi
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    this.logger.log("Try job");
    if (!this.loading) {
      this.loading = true;
      this.logger.log("Start job");
      const status = await this.syncStatusRepository.get("status");
      let offset = status.lastOffset | 0;
      let result: GetComicsResult;
      do {
        this.logger.log(`Batch LIMIT: ${BATCH_NUMBER}, OFFSET: ${offset}`);
        result = await this.marvelApi.getComics({
          limit: BATCH_NUMBER,
          offset,
          orderBy: "onsaleDate",
          characters: CHARACTERS,
        });
        result.data.results.forEach((comic) => {
          this.commandBus.execute(
            new CreateComicCommand({
              id: comic.id.toString(),
              title: comic.title,
              image: `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`,
              characters: comic.characters.items.map((character) => ({
                id: extractIdFromUrl(character.resourceURI),
                name: character.name,
              })),
              creators: comic.creators.items.map((creator) => ({
                id: extractIdFromUrl(creator.resourceURI),
                name: creator.name,
                role: creator.role,
              })),
            })
          );
        });
        offset += result.data.count;
      } while (result.data.count > 0);
      await this.syncStatusRepository.put("status", { lastOffset: offset });
      this.loading = false;
    } else {
      this.logger.warn("Job already in progress");
    }
  }
}
