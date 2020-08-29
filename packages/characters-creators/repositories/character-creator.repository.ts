import { Injectable } from "@nestjs/common";
import {
  GenericRepository,
  MongoDriver,
  AppEventPublisher,
} from "@marvel/infrastructure";
import { ICharacterCreator } from "../models/interfaces/icharacter-creator";
import { CharacterCreatorModel } from "../models/character-creator.model";
@Injectable()
export class CharacterCreatorRepository extends GenericRepository<
  CharacterCreatorModel,
  ICharacterCreator
> {
  constructor(public ep: AppEventPublisher) {
    super(new MongoDriver("character-creator"), CharacterCreatorModel, ep);
  }
}
