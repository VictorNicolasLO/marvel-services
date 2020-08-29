import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import { CreateCharacterCreatorCommand } from "../impl/create-character-creator.command";
import { CharacterCreatorRepository } from "../../repositories/character-creator.repository";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(CreateCharacterCreatorCommand)
export class CreateCharacterCreatorHandler
  implements ICommandHandler<CreateCharacterCreatorCommand> {
  constructor(private readonly repository: CharacterCreatorRepository) {}

  async execute(command: CreateCharacterCreatorCommand) {
    const session = await this.repository.transaction();
    const characterCreatorFound = await this.repository.findOne(
      {
        characterId: command.characterCreatorDto.characterId,
        creatorId: command.characterCreatorDto.creatorId,
        role: command.characterCreatorDto.role,
      },
      { session }
    );
    if (characterCreatorFound) {
      throw new BadRequestException("characterCreatorFound already exist");
    }
    const characterCreator = await this.repository.create(
      command.characterCreatorDto,
      { session }
    );
    session.commitTransaction();
    session.endSession();
    return characterCreator.toDto();
  }
}
