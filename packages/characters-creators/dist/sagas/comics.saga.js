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
const cqrs_1 = require("@nestjs/cqrs");
const operators_1 = require("rxjs/operators");
const comics_1 = require("@marvel/comics");
const create_character_creator_command_1 = require("../commands/impl/create-character-creator.command");
const CAPTAIN_AMERICA_ID = 1009220;
const IRON_MAN_ID = 1009368;
const hasIronManOrCaptainAmerica = ({ id }) => id == CAPTAIN_AMERICA_ID || id == IRON_MAN_ID;
let ComicsSaga = class ComicsSaga {
    constructor() {
        this.signedUp = (events$) => {
            return events$.pipe(cqrs_1.ofType(comics_1.ComicCreatedEventDomain), operators_1.flatMap(({ comic, __promise }) => {
                const validCharacters = comic.characters.filter(hasIronManOrCaptainAmerica);
                const result = validCharacters.map((character) => {
                    return comic.creators.map((creator) => {
                        return new create_character_creator_command_1.CreateCharacterCreatorCommand({
                            character,
                            creator,
                            characterId: character.id,
                            creatorId: creator.id,
                            role: creator.role,
                        });
                    });
                });
                __promise.resolve();
                return result;
            }));
        };
    }
};
__decorate([
    cqrs_1.Saga(),
    __metadata("design:type", Object)
], ComicsSaga.prototype, "signedUp", void 0);
ComicsSaga = __decorate([
    common_1.Injectable()
], ComicsSaga);
exports.ComicsSaga = ComicsSaga;
//# sourceMappingURL=comics.saga.js.map