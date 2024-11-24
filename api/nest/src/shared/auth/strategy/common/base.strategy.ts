import { StrategyEnum } from "@domain/auth/strategy/strategy.enum";
import { IStrategyInput } from "@domain/auth/strategy/strategy.type";
import { IUser } from "@domain/user/user.type";

import { IAuthStrategy } from "~/shared/auth/strategy/common/base.strategy.type";

export const AuthStrategy = <
  K extends keyof IStrategyInput,
  V extends IStrategyInput[K],
>(
  name: K,
) => {
  abstract class BaseStrategy implements IAuthStrategy<V> {
    readonly name: StrategyEnum = name;

    abstract authenticate(input: V): Promise<IUser>;

    invalidAuth(): void {
      throw Error; // @todo Error invalid credentials
    }
  }
  return BaseStrategy;
};
