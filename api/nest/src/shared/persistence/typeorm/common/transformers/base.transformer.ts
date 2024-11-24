import { DeepPartial, EmptyablePartial, UndefinablePartial } from "@type/nullable.type";

import { ITransformer } from "./transformer.type";

export abstract class BaseTransformer<E, I> implements ITransformer<E, I> {
  abstract _persistenceToDomain(entity: E): I;

  persistenceToDomain(entity: E): I;
  persistenceToDomain(entity: EmptyablePartial<E>): EmptyablePartial<I> {
    if (entity === null) return null;
    if (entity === undefined) return undefined;
    return this._persistenceToDomain(entity as E);
  }

  persistenceToDomains(entities: E[]): I[];
  persistenceToDomains(entities: UndefinablePartial<E[]>): UndefinablePartial<I[]> {
    if (entities === undefined) return undefined;
    return entities.map((entity: E) => this.persistenceToDomain(entity));
  }

  abstract _domainToPersistence(element: I): E;
  abstract _domainToPersistence(element: Partial<I>): Partial<E>;
  abstract _domainToPersistence(element: DeepPartial<I>): DeepPartial<E>;

  domainToPersistence(element: I): E;
  domainToPersistence(element: EmptyablePartial<I>): EmptyablePartial<E> {
    if (element === null) return null;
    if (element === undefined) return undefined;
    return this._domainToPersistence(element as I);
  }

  domainToPersistences(elements: I[]): E[];
  domainToPersistences(elements: UndefinablePartial<I[]>): UndefinablePartial<E[]> {
    if (elements === undefined) return undefined;
    return elements.map((element: I) => this.domainToPersistence(element));
  }
}
