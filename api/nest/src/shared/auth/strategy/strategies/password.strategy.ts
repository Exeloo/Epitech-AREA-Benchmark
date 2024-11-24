import { Inject, Injectable } from "@nestjs/common";

import { IPasswordStrategy } from "@domain/auth/strategy/strategies/password.strategy.type";
import { StrategyEnum } from "@domain/auth/strategy/strategy.enum";
import {
  IUserPersistenceRepository,
  USER_PERSISTENCE_REPOSITORY,
} from "@domain/user/user.repository.type";
import { IUser } from "@domain/user/user.type";

import { PasswordService } from "~/shared/auth/services/password/password.service";
import { AuthStrategy } from "~/shared/auth/strategy/common/base.strategy";

@Injectable()
export class PasswordStrategy extends AuthStrategy(StrategyEnum.PASSWORD) {
  constructor(
    @Inject(USER_PERSISTENCE_REPOSITORY)
    private readonly userPRepository: IUserPersistenceRepository,
    private readonly passwordService: PasswordService,
  ) {
    super();
  }

  async authenticate(input: IPasswordStrategy): Promise<IUser> {
    const user = await this.userPRepository.getByEmail(input.email);
    if (!user) this.invalidAuth();

    if (!(await this.passwordService.verify(input.password, user.password)))
      this.invalidAuth();

    return user;
  }
}
