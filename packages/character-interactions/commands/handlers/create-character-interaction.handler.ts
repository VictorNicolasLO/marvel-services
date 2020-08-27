import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import { CreateCharacterInteractionCommand } from "../impl/create-character-interaction.command";
import { CharacterInteractionsRepository } from "../../repositories/character-interactions.repository";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(CreateCharacterInteractionCommand)
export class CreateCharacterInteractionHandler
  implements ICommandHandler<CreateCharacterInteractionCommand> {
  constructor(private readonly repository: CharacterInteractionsRepository) {}

  async execute(command: CreateCharacterInteractionCommand) {
    console.log("HANDLER");
    const characterInteractionExist = await this.repository.findOne({
      id: command.characterInteractionDto.id,
    });
    console.log(characterInteractionExist);
    if (characterInteractionExist) {
      throw new BadRequestException("characterInteractionExist already exist");
    }
    const characterInteraction = await this.repository.create(
      command.characterInteractionDto
    );
    return characterInteraction.toDto();
  }
}
