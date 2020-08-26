import { Injectable } from "@nestjs/common";
import {
  AppEventPublisher,
  GenericQueryKeyValueRepository,
  RedisDriver,
} from "@marvel/infrastructure";
import { ICharacterInteractions } from "./interfaces/icharacter-interactions";

@Injectable()
export class ReadCharacterInteractionsRepository extends GenericQueryKeyValueRepository<
  ICharacterInteractions
> {
  constructor(public ep: AppEventPublisher) {
    super(new RedisDriver("read-character-interactions"));
  }
}
