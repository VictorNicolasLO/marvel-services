import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CharacterCreatorCreatedEvent } from "@marvel/character-creators";
import { ReadCharacterCreatorRepository } from "../repositories/read-character-creator.repository";
import { generateNameId } from "../utils/generate-name-id";

@EventsHandler(CharacterCreatorCreatedEvent)
export class CharacterCreatorCreatedHandler
  implements IEventHandler<CharacterCreatorCreatedEvent> {
  constructor(
    private readCharacterCreatorRepository: ReadCharacterCreatorRepository
  ) {}

  async handle({ characterCreator }: CharacterCreatorCreatedEvent) {
    const nameId = generateNameId(characterCreator.character.name);
    const characterCreatorsFound = await this.readCharacterCreatorRepository.get(
      nameId
    );
    if (characterCreatorsFound) {
      characterCreatorsFound.lastSync = new Date();
      if (!characterCreatorsFound[characterCreator.role]) {
        characterCreatorsFound[characterCreator.role] = [];
      }
      characterCreatorsFound[characterCreator.role].push(
        characterCreator.creator
      );
      await this.readCharacterCreatorRepository.put(
        nameId,
        characterCreatorsFound
      );
    } else {
      await this.readCharacterCreatorRepository.put(nameId, {
        lastSync: new Date(),
        mainCharacter: characterCreator.character,
        [characterCreator.role]: [characterCreator.creator],
      });
    }
  }
}
