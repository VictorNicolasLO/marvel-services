import { Injectable } from "@nestjs/common";
import {
  GenericRepository,
  MongoDriver,
  AppEventPublisher,
} from "@marvel/infrastructure";
import { ICharacterInteraction } from "../models/interfaces/icharacter-interaction";
import { CharacterInteractionModel } from "../models/character-interaction.model";

@Injectable()
export class CharacterInteractionsRepository extends GenericRepository<
  CharacterInteractionModel,
  ICharacterInteraction
> {
  constructor(public ep: AppEventPublisher) {
    super(
      new MongoDriver("character-interactions"),
      CharacterInteractionModel,
      ep
    );
  }
}
