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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const md5_1 = __importDefault(require("md5"));
const config_1 = require("../config");
let MarvelApi = class MarvelApi {
    constructor() {
        const api = axios_1.default.create({ baseURL: config_1.MARVEL_BASE_URL });
        api.interceptors.request.use((config) => {
            const ts = Date.now();
            config.params.ts = ts;
            config.params.apikey = config_1.MARVEL_PUBLIC_KEY;
            config.params.hash = md5_1.default(ts + config_1.MARVEL_PRIVATE_KEY + config_1.MARVEL_PUBLIC_KEY);
            return config;
        });
        this.api = api;
    }
    async getComics(params) {
        return (await this.api.get("comics", { params })).data;
    }
};
MarvelApi = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], MarvelApi);
exports.MarvelApi = MarvelApi;
//# sourceMappingURL=marvel.api.js.map