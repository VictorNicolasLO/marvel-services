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
const common_1 = require("@nestjs/common");
const marvel_comics_cron_service_1 = require("./marvel-comics-cron.service");
const infrastructure_1 = require("@marvel/infrastructure");
const sync_status_repository_1 = require("./repositories/sync-status-repository");
const marvel_api_1 = require("./apis/marvel.api");
const schedule_1 = require("@nestjs/schedule");
const APP_NAME = process.env.APP_NAME || 'marvel-comics-cron';
let MarvelComicsCronModule = class MarvelComicsCronModule {
    constructor(command$, appQueryBus) {
        this.command$ = command$;
        this.appQueryBus = appQueryBus;
        this.command$.domainName = APP_NAME;
        this.appQueryBus.domainName = APP_NAME;
    }
};
MarvelComicsCronModule = __decorate([
    common_1.Module({
        imports: [schedule_1.ScheduleModule.forRoot()],
        providers: [marvel_comics_cron_service_1.MarvelComicsCronService, infrastructure_1.AppCommandBus, infrastructure_1.AppQueryBus, sync_status_repository_1.SyncStatusRepository, marvel_api_1.MarvelApi],
    }),
    __metadata("design:paramtypes", [infrastructure_1.AppCommandBus,
        infrastructure_1.AppQueryBus])
], MarvelComicsCronModule);
exports.MarvelComicsCronModule = MarvelComicsCronModule;
;
//# sourceMappingURL=marvel-comics-cron.module.js.map