import { GenericQueryKeyValueRepository } from "@marvel/infrastructure";
import { IStatus } from "./interfaces/istatus";
export declare class SyncStatusRepository extends GenericQueryKeyValueRepository<IStatus> {
    constructor();
}
