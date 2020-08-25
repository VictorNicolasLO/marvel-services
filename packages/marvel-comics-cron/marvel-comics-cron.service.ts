import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { AppCommandBus } from "@marvel/infrastructure";
import { SyncStatusRepository } from "./repositories/sync-status-repository";
import { MarvelApi } from "./apis/marvel.api";
import { GetComicsResult } from "./apis/marvel.api.types";

const BATCH_NUMBER = 100;

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
        });
        result.data.results.forEach((comic) => {
          this.commandBus.execute; // TODO send command
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
