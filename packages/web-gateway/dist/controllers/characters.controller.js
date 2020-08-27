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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const infrastructure_1 = require("@marvel/infrastructure");
const search_character_interactions_1 = require("@marvel/search-character-interactions");
let CharactersController = class CharactersController {
    constructor(queryBus) {
        this.queryBus = queryBus;
    }
    async getCharacters(nameId) {
        return await this.queryBus.execute(new search_character_interactions_1.GetCharacterInteractionByNameQuery(nameId));
    }
};
__decorate([
    common_1.Get(":nameId"),
    __param(0, common_1.Param("nameId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CharactersController.prototype, "getCharacters", null);
CharactersController = __decorate([
    common_1.Controller("characters"),
    __metadata("design:paramtypes", [infrastructure_1.AppQueryBus])
], CharactersController);
exports.CharactersController = CharactersController;
//# sourceMappingURL=characters.controller.js.map