import { Inject, Injectable } from "@nestjs/common";

import { AUTH_SERVICE, IAuthService } from "@domain/auth/auth.repository.type";
import { IAuthPasswordInput } from "@domain/auth/dto/password.auth.type";
import {
  IAuthRefreshTokenInput,
  IAuthToken,
} from "@domain/auth/dto/token.auth.type";
import { StrategyEnum } from "@domain/auth/strategy/strategy.enum";
import { UserService } from "@domain/user/user.service";
import { IUser } from "@domain/user/user.type";

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuthService,
    private readonly userService: UserService,
  ) {}

  async login(input: IAuthPasswordInput): Promise<IAuthToken> {
    const user = await this.authPassword(input.email, input.password);
    return await this.authService.generateToken(user.id);
  }

  async refreshToken(input: IAuthRefreshTokenInput): Promise<IAuthToken> {
    const tokens = await this.authService.refreshToken(input.refreshToken);
    const user = await this.authToken(tokens.token);
    await this.userService.updateLastConnection(user.id);
    return tokens;
  }

  authPassword(email: string, password: string): Promise<IUser> {
    return this.authService.authenticate(StrategyEnum.PASSWORD, {
      email,
      password,
    });
  }

  authToken(token: string): Promise<IUser> {
    return this.authService.authenticate(StrategyEnum.TOKEN, {
      token,
    });
  }
}
