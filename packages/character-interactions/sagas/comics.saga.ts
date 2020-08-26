import { Injectable, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";

import { delay, flatMap } from "rxjs/operators";
import { ComicCreatedEventDomain } from "@marvel/comics";
import { CreateCharacterInteractionCommand } from "../commands/impl/create-character-interaction.command";
import { getCharacterCouples } from "../utils/get-character-couples";

const sortNameAsc = (a: any, b: any) =>
  a.id > b.id ? 1 : a.name < b.name ? -1 : 0;

const extractId = (obj: any) => obj.id;

const flat = (current, newArr) => [...current, newArr];

@Injectable()
export class ComicsSaga {
  @Saga()
  signedUp = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      delay(1000),
      ofType(ComicCreatedEventDomain),
      flatMap(({ comic }) =>
        getCharacterCouples(comic.characters)
          .map((characterCouples) =>
            characterCouples.map((characterCouple) => {
              const characters = characterCouple.sort(sortNameAsc);
              const charactersId = characters.map(extractId).join("-");
              const id = `${comic.id}-${charactersId}`;
              return new CreateCharacterInteractionCommand({
                id,
                characters,
                comic: { id: comic.id, image: comic.image, title: comic.title },
              });
            })
          )
          .reduce(flat, [])
      )
    );
  };
}
