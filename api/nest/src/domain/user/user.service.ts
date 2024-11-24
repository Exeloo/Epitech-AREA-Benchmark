import { Inject } from "@nestjs/common";

import { ID } from "@d-type/id.type";

import {
  IUserPersistenceRepository,
  USER_PERSISTENCE_REPOSITORY,
} from "@domain/user/user.repository.type";
import { IUser } from "@domain/user/user.type";

export class UserService {
  constructor(
    @Inject(USER_PERSISTENCE_REPOSITORY)
    private readonly userPRepository: IUserPersistenceRepository,
  ) {}

  getById(id: ID): Promise<IUser> {
    return this.userPRepository.getById(id);
  }

  getByEmail(email: string): Promise<IUser | null> {
    return this.userPRepository.getByEmail(email);
  }

  update(id: ID, input: Partial<IUser>): Promise<IUser> {
    return this.userPRepository.updateEntity(id, input);
  }

  updateLastConnection(id: ID): Promise<IUser> {
    return this.update(id, {
      lastConnection: new Date(Date.now()),
    });
  }
}
