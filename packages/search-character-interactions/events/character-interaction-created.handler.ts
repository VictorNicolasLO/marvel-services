import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CharacterInteractionCreatedEvent } from "@marvel/character-interactions";
import { ReadCharacterInteractionsRepository } from "../repositories/read-character-interactions.repository";
import { generateNameId } from "../utils/generate-name-id";

@EventsHandler(CharacterInteractionCreatedEvent)
export class CharacterInteractionCreatedHandler
  implements IEventHandler<CharacterInteractionCreatedEvent> {
  constructor(
    private readCharacterInteractionsRepository: ReadCharacterInteractionsRepository
  ) {}

  async handle({ characterInteraction }: CharacterInteractionCreatedEvent) {
    await Promise.all(
      characterInteraction.characters.map(async (character, index) => {
        const characterToAdd =
          characterInteraction.characters[index - 1] ||
          characterInteraction.characters[index + 1];
        const nameId = generateNameId(character.name);
        const {
          value: interactionsFound,
          unlock,
        } = await this.readCharacterInteractionsRepository.getAndLock(nameId);
        const comicSummary = {
          name: characterInteraction.comic.title,
          image: characterInteraction.comic.image,
        };
        if (interactionsFound) {
          const characterAlreadyRelatedIndex = interactionsFound.characters.findIndex(
            (character) => character.id === characterToAdd.id
          );

          const characterAlreadyRelated =
            interactionsFound.characters[characterAlreadyRelatedIndex];
          if (characterAlreadyRelated) {
            characterAlreadyRelated.comics.push(comicSummary);
            interactionsFound.characters[index] = characterAlreadyRelated;
          } else {
            interactionsFound.characters.push({
              comics: [comicSummary],
              id: characterToAdd.id,
              name: characterToAdd.name,
            });
          }
          interactionsFound.lastSync = new Date();
          await this.readCharacterInteractionsRepository.put(
            nameId,
            interactionsFound
          );
        } else {
          await this.readCharacterInteractionsRepository.put(nameId, {
            mainCharacter: character,
            lastSync: new Date(),
            characters: [
              {
                id: characterToAdd.id,
                name: characterToAdd.name,
                comics: [comicSummary],
              },
            ],
          });
        }

        await unlock();
      })
    );
  }
}
