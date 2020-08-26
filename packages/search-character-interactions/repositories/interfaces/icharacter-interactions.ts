interface IComicSummary {
  name: string;
  image: string;
}

interface ICharacter {
  id: string;
  name: string;
  comics: IComicSummary[];
}

interface IMainCharacter {
  id: string;
  name: string;
}

export interface ICharacterInteractions {
  lastSync: Date;
  mainCharacter: IMainCharacter;
  characters: ICharacter[];
}
