import { DeepPartial, EmptyablePartial, NullablePartial, UndefinablePartial } from "@type/nullable.type";

export interface ITransformer<E, I> {
  _persistenceToDomain(entity: E): I;
  _persistenceToDomain(entity: Partial<E>): Partial<I>;
  _persistenceToDomain(entity: DeepPartial<E>): DeepPartial<I>;

  persistenceToDomain(entity: E): I;
  persistenceToDomain(entity: Partial<E>): Partial<I>;
  persistenceToDomain(entity: DeepPartial<E>): DeepPartial<I>;
  persistenceToDomain(entity: NullablePartial<E>): NullablePartial<I>;
  persistenceToDomain(entity: UndefinablePartial<E>): UndefinablePartial<I>;
  persistenceToDomain(entity: EmptyablePartial<E>): EmptyablePartial<I>;

  persistenceToDomains(entities: E[]): I[];
  persistenceToDomains(entities: Partial<E[]>): Partial<I[]>;
  persistenceToDomains(entities: DeepPartial<E[]>): DeepPartial<I[]>;
  persistenceToDomains(entities: UndefinablePartial<E[]>): UndefinablePartial<I[]>;

  _domainToPersistence(element: I): E;
  _domainToPersistence(element: Partial<I>): Partial<E>;
  _domainToPersistence(element: DeepPartial<I>): DeepPartial<E>;

  domainToPersistence(element: I): E;
  domainToPersistence(element: Partial<I>): Partial<E>;
  domainToPersistence(element: DeepPartial<I>): DeepPartial<E>;
  domainToPersistence(element: NullablePartial<I>): NullablePartial<E>;
  domainToPersistence(element: UndefinablePartial<I>): UndefinablePartial<E>;
  domainToPersistence(element: EmptyablePartial<I>): EmptyablePartial<E>;

  domainToPersistences(elements: I[]): E[];
  domainToPersistences(elements: Partial<I[]>): Partial<E[]>;
  domainToPersistences(elements: DeepPartial<I[]>): DeepPartial<E[]>;
  domainToPersistences(elements: UndefinablePartial<I[]>): UndefinablePartial<E[]>;
}
