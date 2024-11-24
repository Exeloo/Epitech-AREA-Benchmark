import { IUser } from "@domain/user/user.type";

import { BaseTransformer } from "../common/transformers/base.transformer";
import { ITransformer } from "../common/transformers/transformer.type";
import { UserEntity } from "../entities/user.entity";

class BaseUserTransformer
  extends BaseTransformer<UserEntity, IUser>
  implements ITransformer<UserEntity, IUser>
{
  _persistenceToDomain(entity: UserEntity): IUser {
    return {
      id: entity.id,
      email: entity.email,
      password: entity.password,
      lastConnection: entity.lastConnection,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }

  _domainToPersistence(element: IUser): UserEntity {
    return {
      id: element.id,
      email: element.email,
      password: element.password,
      lastConnection: element.lastConnection,
      createdAt: element.createdAt,
      updatedAt: element.updatedAt,
      deletedAt: element.deletedAt,
    };
  }
}

export const UserTransformer: ITransformer<UserEntity, IUser> =
  new BaseUserTransformer();
