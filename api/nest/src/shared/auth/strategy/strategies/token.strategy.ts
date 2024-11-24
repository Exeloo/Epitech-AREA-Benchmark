import { Injectable } from "@nestjs/common";

import { ITokenStrategy } from "@domain/auth/strategy/strategies/token.strategy.type";
import { StrategyEnum } from "@domain/auth/strategy/strategy.enum";
import { IUser } from "@domain/user/user.type";

import { TokenService } from "~/shared/auth/services/token/token.service";
import { AuthStrategy } from "~/shared/auth/strategy/common/base.strategy";

@Injectable()
export class TokenStrategy extends AuthStrategy(StrategyEnum.TOKEN) {
  constructor(private readonly tokenService: TokenService) {
    super();
  }

  async authenticate(input: ITokenStrategy): Promise<IUser> {
    const user = await this.tokenService.verifyAccessToken(input.token);
    if (!user) this.invalidAuth();

    return user;
  }
}
