import { IBasePersistenceRepository } from "@domain/common/interfaces/repositories/base.persistence.repository.type";
import { IUser } from "@domain/user/user.type";

export const USER_PERSISTENCE_REPOSITORY = "USER_PERSISTENCE_REPOSITORY";

export interface IUserPersistenceRepository
  extends IBasePersistenceRepository<IUser> {
  getByEmail(email: string): Promise<IUser | null>;
}
