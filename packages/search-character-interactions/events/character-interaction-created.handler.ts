import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CharacterInteractionCreatedEvent } from "@marvel/character-interactions";
import { ReadCharacterInteractionsRepository } from "../repositories/read-character-interactions.repository";
import { generateNameId } from "../utils/generate-name-id";
const CAPTAIN_AMERICA_ID = 1009220;
const IRON_MAN_ID = 1009368;
@EventsHandler(CharacterInteractionCreatedEvent)
export class CharacterInteractionCreatedHandler
  implements IEventHandler<CharacterInteractionCreatedEvent> {
  constructor(
    private readCharacterInteractionsRepository: ReadCharacterInteractionsRepository
  ) {}

  async handle({ characterInteraction }: CharacterInteractionCreatedEvent) {
    for (
      let index = 0;
      index < characterInteraction.characters.length;
      index++
    ) {
      const character = characterInteraction.characters[index];
      if (
        parseInt(character.id) !== CAPTAIN_AMERICA_ID &&
        parseInt(character.id) !== IRON_MAN_ID
      ) {
        continue;
      }
      const characterToAdd =
        index == 0
          ? characterInteraction.characters[1]
          : characterInteraction.characters[0];
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
        const characterAlreadyRelated = interactionsFound.characters.find(
          (char) => char.id == characterToAdd.id
        );
        const charactersWithoutCharacterRelated = interactionsFound.characters.filter(
          (char) => char.id != characterToAdd.id
        );

        const characterRelated = characterAlreadyRelated
          ? {
              ...characterAlreadyRelated,
              comics: [...characterAlreadyRelated.comics, comicSummary],
            }
          : {
              comics: [comicSummary],
              id: characterToAdd.id,
              name: characterToAdd.name,
            };
        await this.readCharacterInteractionsRepository.put(nameId, {
          ...interactionsFound,
          lastSync: new Date(),
          characters: [...charactersWithoutCharacterRelated, characterRelated],
        });
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
      unlock();
    }
  }
}
