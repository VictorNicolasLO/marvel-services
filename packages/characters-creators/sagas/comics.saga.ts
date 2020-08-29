import { Injectable, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { flatMap } from "rxjs/operators";
import { ComicCreatedEventDomain } from "@marvel/comics";
import { CreateCharacterCreatorCommand } from "../commands/impl/create-character-creator.command";
import { sagaWrapper } from "@marvel/infrastructure";
const CAPTAIN_AMERICA_ID = 1009220;
const IRON_MAN_ID = 1009368;

const hasIronManOrCaptainAmerica = ({ id }) =>
  id == CAPTAIN_AMERICA_ID || id == IRON_MAN_ID;

@Injectable()
export class ComicsSaga {
  @Saga()
  signedUp = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      flatMap(
        sagaWrapper(({ comic }: ComicCreatedEventDomain) => {
          const validCharacters = comic.characters.filter(
            hasIronManOrCaptainAmerica
          );
          return validCharacters.map((character) => {
            return comic.creators.map((creator) => {
              return new CreateCharacterCreatorCommand({
                character,
                creator,
                characterId: character.id,
                creatorId: creator.id,
                role: creator.role,
              });
            });
          });
        })
      )
    );
  };
}
