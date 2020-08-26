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
    id: string;
    characters: ICharacter[];
    comic: IComicSummary;
}
