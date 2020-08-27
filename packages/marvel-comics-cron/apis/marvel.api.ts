import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import md5 from "md5";
import {
  MARVEL_PRIVATE_KEY,
  MARVEL_PUBLIC_KEY,
  MARVEL_BASE_URL,
} from "../config";
import { GetComicsParams, GetComicsResult } from "./marvel.api.types";

@Injectable()
export class MarvelApi {
  api: AxiosInstance;
  constructor() {
    const api = axios.create({ baseURL: MARVEL_BASE_URL });
    api.interceptors.request.use((config) => {
      const ts = Date.now();
      config.params.ts = ts;
      config.params.apikey = MARVEL_PUBLIC_KEY;
      config.params.hash = md5(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);
      return config;
    });
    this.api = api;
  }

  async getComics(params: GetComicsParams): Promise<GetComicsResult> {
    return (await this.api.get("comics", { params })).data;
  }
}
