import { Injectable } from "@nestjs/common";
import {
  AppEventPublisher,
  GenericQueryKeyValueRepository,
  RedisDriver,
} from "@marvel/infrastructure";
import { ICharacterCreator } from "./interfaces/icharacter-creator";

@Injectable()
export class ReadCharacterCreatorRepository extends GenericQueryKeyValueRepository<
  ICharacterCreator
> {
  constructor(public ep: AppEventPublisher) {
    super(new RedisDriver("read-character-creators"));
  }
}
