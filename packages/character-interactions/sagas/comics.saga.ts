import { Injectable, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";

import { delay, flatMap } from "rxjs/operators";
import { ComicCreatedEventDomain } from "@marvel/comics";
import { CreateCharacterInteractionCommand } from "../commands/impl/create-character-interaction.command";
import { getCharacterCouples } from "../utils/get-character-couples";

const CAPTAIN_AMERICA_ID = 1009220;
const IRON_MAN_ID = 1009368;

const sortNameAsc = (a: any, b: any) =>
  a.id > b.id ? 1 : a.name < b.name ? -1 : 0;

const extractId = (obj: any) => obj.id;

const flat = (current, newArr) => [...current, ...newArr];

const containsIronManOrCaptainAmerica = (characterCouple) =>
  characterCouple[0].id == CAPTAIN_AMERICA_ID ||
  characterCouple[0].id == IRON_MAN_ID ||
  characterCouple[1].id == CAPTAIN_AMERICA_ID ||
  characterCouple[1].id == IRON_MAN_ID;

@Injectable()
export class ComicsSaga {
  @Saga()
  signedUp = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ComicCreatedEventDomain),
      flatMap(({ comic }) => {
        const couples = getCharacterCouples(comic.characters);

        const res = couples.map((characterCouples) =>
          characterCouples
            .filter(containsIronManOrCaptainAmerica)
            .map((characterCouple) => {
              const characters = characterCouple.sort(sortNameAsc);
              const charactersId = characters.map(extractId).join("-");
              const id = `${comic.id}-${charactersId}`;
              return new CreateCharacterInteractionCommand({
                id,
                characters,
                comic: { id: comic.id, image: comic.image, title: comic.title },
              });
            })
        );
        const finalRes = res.filter((arr) => arr.length > 0).reduce(flat, []);
        return finalRes;
      })
    );
  };
}
