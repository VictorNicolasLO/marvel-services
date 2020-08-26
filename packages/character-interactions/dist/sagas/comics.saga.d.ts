import { Observable } from "rxjs";
import { ICommand } from "@nestjs/cqrs";
export declare class ComicsSaga {
    signedUp: (events$: Observable<any>) => Observable<ICommand>;
}
