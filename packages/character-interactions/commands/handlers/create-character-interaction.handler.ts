import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import { CreateCharacterInteractionCommand } from "../impl/create-character-interaction.command";
import { CharacterInteractionsRepository } from "../../repositories/character-interactions.repository";

@CommandHandler(CreateCharacterInteractionCommand)
export class CreateCharacterInteractionHandler
  implements ICommandHandler<CreateCharacterInteractionCommand> {
  constructor(private readonly repository: CharacterInteractionsRepository) {}

  async execute(command: CreateCharacterInteractionCommand) {
    const characterInteraction = await this.repository.create(
      command.characterInteractionDto
    );
    return characterInteraction.toDto();
  }
}
