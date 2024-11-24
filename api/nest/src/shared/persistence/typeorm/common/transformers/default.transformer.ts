import { DeepPartial } from "@type/nullable.type";
import { ObjectLiteral } from "@type/object.type";

import { BaseTransformer } from "./base.transformer";
import { ITransformer } from "./transformer.type";

export class DefaultTransformer<E extends ObjectLiteral, I>
  extends BaseTransformer<E, I>
  implements ITransformer<E, I>
{
  _persistenceToDomain(entity: E): I;
  _persistenceToDomain(entity: DeepPartial<E>): DeepPartial<I> {
    return { ...entity } as DeepPartial<I>;
  }

  _domainToPersistence(element: I): E;
  _domainToPersistence(element: DeepPartial<I>): DeepPartial<E> {
    return { ...element } as DeepPartial<E>;
  }
}
