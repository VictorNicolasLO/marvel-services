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
const get_character_creator_by_name_query_1 = require("../impl/get-character-creator-by-name.query");
const read_character_creator_repository_1 = require("../../repositories/read-character-creator.repository");
let GetCharacterCreatorByNameHandler = class GetCharacterCreatorByNameHandler {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(query) {
        return await this.repository.get(query.name);
    }
};
GetCharacterCreatorByNameHandler = __decorate([
    cqrs_1.QueryHandler(get_character_creator_by_name_query_1.GetCharacterCreatorByNameQuery),
    __metadata("design:paramtypes", [read_character_creator_repository_1.ReadCharacterCreatorRepository])
], GetCharacterCreatorByNameHandler);
exports.GetCharacterCreatorByNameHandler = GetCharacterCreatorByNameHandler;
//# sourceMappingURL=get-character-creator.handler.js.map