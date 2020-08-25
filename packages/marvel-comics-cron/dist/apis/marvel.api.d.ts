import { AxiosInstance } from 'axios';
import { GetComicsParams } from './marvel.api.types';
export declare class MarvelApi {
    api: AxiosInstance;
    constructor();
    getComics(params: GetComicsParams): Promise<any>;
}
