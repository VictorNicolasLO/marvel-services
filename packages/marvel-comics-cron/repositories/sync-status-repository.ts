import { Injectable } from '@nestjs/common';
import { GenericQueryKeyValueRepository, RedisDriver } from '@marvel/infrastructure'
import { IStatus } from './interfaces/istatus';
@Injectable()
export class SyncStatusRepository extends GenericQueryKeyValueRepository<IStatus> {
  constructor() {
    super(new RedisDriver("sync-status"));
  }

}
