export interface ICharacter {
  id: string;
  name: string;
}

export interface ICreatorSummary {
  id: string;
  name: string;
  role: string;
}

export interface ICharacterCreator {
  characterId: string;
  creatorId: string;
  role: string;
  character: ICharacter;
  creator: ICreatorSummary;
}
