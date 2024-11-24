export type DeepPartial<T> =
  | T
  | (T extends Date
      ? T
      : T extends Array<infer U>
        ? DeepPartial<U>[]
        : T extends Map<infer K, infer V>
          ? Map<DeepPartial<K>, DeepPartial<V>>
          : T extends Set<infer M>
            ? Set<DeepPartial<M>>
            : T extends object
              ? {
                  [K in keyof T]?: DeepPartial<T[K]>;
                }
              : T);

export type Undefinable<T> = T | undefined;

export type UndefinablePartial<T> = Undefinable<T | Partial<T> | DeepPartial<T>>;

export type Nullable<T> = T | null;

export type NullablePartial<T> = Nullable<T | Partial<T> | DeepPartial<T>>;

export type Emptyable<T> = Undefinable<T> | Nullable<T>;

export type EmptyablePartial<T> = Emptyable<T | Partial<T> | DeepPartial<T>>;
