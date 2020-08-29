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
const infrastructure_1 = require("@marvel/infrastructure");
const operators_1 = require("rxjs/operators");
const create_character_interaction_command_1 = require("../commands/impl/create-character-interaction.command");
const get_character_couples_1 = require("../utils/get-character-couples");
const CAPTAIN_AMERICA_ID = 1009220;
const IRON_MAN_ID = 1009368;
const sortNameAsc = (a, b) => a.id > b.id ? 1 : a.name < b.name ? -1 : 0;
const extractId = (obj) => obj.id;
const flat = (current, newArr) => [...current, ...newArr];
const containsIronManOrCaptainAmerica = (characterCouple) => characterCouple[0].id == CAPTAIN_AMERICA_ID ||
    characterCouple[0].id == IRON_MAN_ID ||
    characterCouple[1].id == CAPTAIN_AMERICA_ID ||
    characterCouple[1].id == IRON_MAN_ID;
let ComicsSaga = class ComicsSaga {
    constructor() {
        this.signedUp = (events$) => {
            return events$.pipe(operators_1.flatMap(infrastructure_1.sagaWrapper(({ comic }) => {
                const couples = get_character_couples_1.getCharacterCouples(comic.characters);
                const res = couples.map((characterCouples) => characterCouples
                    .filter(containsIronManOrCaptainAmerica)
                    .map((characterCouple) => {
                    const characters = characterCouple.sort(sortNameAsc);
                    const charactersId = characters.map(extractId).join("-");
                    const id = `${comic.id}-${charactersId}`;
                    return new create_character_interaction_command_1.CreateCharacterInteractionCommand({
                        id,
                        characters,
                        comic: {
                            id: comic.id,
                            image: comic.image,
                            title: comic.title,
                        },
                    });
                }));
                return res.filter((arr) => arr.length > 0).reduce(flat, []);
            })));
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