import { KeyValueDbDriver } from '../db-drivers/db-driver';


export class GenericQueryKeyValueRepository<T> {

  constructor(public driver: KeyValueDbDriver<T>) {
  }

  async put(key: string, dto: T) {
    return await this.driver.put(key, dto)
  }

  async get(key: string) {
    return await this.driver.get(key)
  }
}
