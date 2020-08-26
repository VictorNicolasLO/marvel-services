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
exports.ComicsSaga = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const operators_1 = require("rxjs/operators");
const comics_1 = require("@marvel/comics");
const create_character_interaction_command_1 = require("../commands/impl/create-character-interaction.command");
const sortNameAsc = (a, b) => a.id > b.id ? 1 : a.name < b.name ? -1 : 0;
const extractId = (obj) => obj.id;
let ComicsSaga = class ComicsSaga {
    constructor() {
        this.signedUp = (events$) => {
            return events$.pipe(operators_1.delay(1000), cqrs_1.ofType(comics_1.ComicCreatedEventDomain), operators_1.map(({ comic }) => {
                const characters = comic.characters.sort(sortNameAsc);
                const charactersId = characters.map(extractId).join("-");
                const id = `${comic.id}-${charactersId}`;
                return new create_character_interaction_command_1.CreateCharacterInteractionCommand({
                    id,
                    characters,
                    comic: { id: comic.id, image: comic.image, title: comic.title },
                });
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