import { Module } from '@nestjs/common';
import { MarvelComicsCronService } from './marvel-comics-cron.service';
import { AppCommandBus, AppQueryBus } from '@marvel/infrastructure'
import { SyncStatusRepository } from './repositories/sync-status-repository';
import { MarvelApi } from './apis/marvel.api';
import { ScheduleModule } from '@nestjs/schedule';
const APP_NAME = process.env.APP_NAME || 'marvel-comics-cron'

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [MarvelComicsCronService, AppCommandBus, AppQueryBus, SyncStatusRepository, MarvelApi],
})
export class MarvelComicsCronModule {
  constructor(
    private readonly command$: AppCommandBus,
    private readonly appQueryBus: AppQueryBus,
  ) {
    /** ------------ */
    this.command$.domainName = APP_NAME;
    this.appQueryBus.domainName = APP_NAME;
  }
};
