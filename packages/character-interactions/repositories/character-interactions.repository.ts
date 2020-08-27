import { Injectable } from "@nestjs/common";
import { GenericRepository, MongoDriver } from "@marvel/infrastructure";
import { ICharacterInteraction } from "../models/interfaces/icharacter-interaction";
import { CharacterInteractionModel } from "../models/character-interaction.model";
import { EventPublisher } from "@nestjs/cqrs";
@Injectable()
export class CharacterInteractionsRepository extends GenericRepository<
  CharacterInteractionModel,
  ICharacterInteraction
> {
  constructor(public ep: EventPublisher) {
    super(
      new MongoDriver("character-interactions"),
      CharacterInteractionModel,
      ep
    );
  }
}
