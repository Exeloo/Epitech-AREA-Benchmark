import { DeepPartial } from "@type/nullable.type";

import { ID } from "@d-type/id.type";

export interface IBasePersistenceRepository<T> {
  getById(id: ID): Promise<T>;

  getAll(): Promise<T[]>;

  createEntity(input: DeepPartial<T>): Promise<T>;

  updateEntity(id: ID, input: DeepPartial<T>): Promise<T>;

  deleteEntity(id: ID, hardDelete?: boolean): Promise<T>;
}
