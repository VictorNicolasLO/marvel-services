import { AxiosInstance } from "axios";
import { GetComicsParams, GetComicsResult } from "./marvel.api.types";
export declare class MarvelApi {
    api: AxiosInstance;
    constructor();
    getComics(params: GetComicsParams): Promise<GetComicsResult>;
}
