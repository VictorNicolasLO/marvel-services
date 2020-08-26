export interface ICharacter {
  id: string;
  name: string;
}

export interface IComicSummary {
  id: string;
  title: string;
  image: string;
}

export interface ICharacterInteraction {
  id: string; // ID is composed by comicId-character1Id-character2Id
  characters: ICharacter[];
  comic: IComicSummary;
}
