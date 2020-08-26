export interface ICharacter {
  id: string;
  name: string;
}
export interface ICreators {
  id: string;
  name: string;
  role: string;
}

export interface IComic {
  id: string;
  title: string;
  image: string;
  characters: ICharacter[];
  creators: ICreators[];
}
