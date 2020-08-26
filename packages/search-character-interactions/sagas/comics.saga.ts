import { Injectable, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";

import { delay, map } from "rxjs/operators";
import { ComicCreatedEventDomain } from "@marvel/comics";
import { CreateCharacterInteractionCommand } from "../commands/impl/create-character-interaction.command";

const sortNameAsc = (a: any, b: any) =>
  a.id > b.id ? 1 : a.name < b.name ? -1 : 0;

const extractId = (obj: any) => obj.id;

@Injectable()
export class ComicsSaga {
  @Saga()
  signedUp = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      delay(1000),
      ofType(ComicCreatedEventDomain),
      map(({ comic }) => {
        const characters = comic.characters.sort(sortNameAsc);
        const charactersId = characters.map(extractId).join("-");
        const id = `${comic.id}-${charactersId}`;
        return new CreateCharacterInteractionCommand({
          id,
          characters,
          comic: { id: comic.id, image: comic.image, title: comic.title },
        });
      })
    );
  };
}
