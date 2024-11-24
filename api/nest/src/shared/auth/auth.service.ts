import { Injectable } from "@nestjs/common";

import { ID } from "@d-type/id.type";

import { IAuthService } from "@domain/auth/auth.repository.type";
import { IAuthToken } from "@domain/auth/dto/token.auth.type";
import { IStrategyInput } from "@domain/auth/strategy/strategy.type";
import { IUser } from "@domain/user/user.type";

import { PasswordService } from "~/shared/auth/services/password/password.service";
import { TokenService } from "~/shared/auth/services/token/token.service";
import { StrategyService } from "~/shared/auth/strategy/strategy.service";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly strategyService: StrategyService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  authenticate<K extends keyof IStrategyInput>(
    type: K,
    input: IStrategyInput[K],
  ): Promise<IUser> {
    return this.strategyService.authenticate(type, input);
  }

  hashPassword(password: string): Promise<string> {
    return this.passwordService.encrypt(password);
  }

  refreshToken(token: string): Promise<IAuthToken> {
    return this.tokenService.refreshToken(token);
  }

  generateToken(userId: ID): Promise<IAuthToken> {
    return this.tokenService.generateToken(userId);
  }
}
