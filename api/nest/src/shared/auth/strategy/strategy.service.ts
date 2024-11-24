import { Injectable } from "@nestjs/common";

import { StrategyEnum } from "@domain/auth/strategy/strategy.enum";
import { IStrategyInput } from "@domain/auth/strategy/strategy.type";
import { IUser } from "@domain/user/user.type";

import { IStrategy } from "~/shared/auth/strategy/strategy.type";

import { PasswordStrategy } from "./strategies/password.strategy";
import { TokenStrategy } from "./strategies/token.strategy";

@Injectable()
export class StrategyService {
  private readonly strategyMap: IStrategy;

  constructor(
    passwordStrategy: PasswordStrategy,
    tokenStrategy: TokenStrategy,
  ) {
    this.strategyMap = {
      [StrategyEnum.PASSWORD]: passwordStrategy,
      [StrategyEnum.TOKEN]: tokenStrategy,
    };
  }

  authenticate<K extends keyof IStrategyInput>(
    type: K,
    input: IStrategyInput[K],
  ): Promise<IUser> {
    const strategy = this.strategyMap[type];
    if (!strategy) throw Error; // @todo Error internal, strategy not implemented

    return strategy.authenticate(input);
  }
}
