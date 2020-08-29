interface IMainCharacter {
  id: string;
  name: string;
}

export interface ICharacterCreator {
  lastSync: Date;
  mainCharacter: IMainCharacter;
  [role: string]: any;
}
