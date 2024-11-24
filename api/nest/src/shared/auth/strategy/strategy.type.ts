import { IStrategyInput } from "@domain/auth/strategy/strategy.type";

import { IAuthStrategy } from "~/shared/auth/strategy/common/base.strategy.type";

export type IStrategy = {
  [K in keyof IStrategyInput]: IAuthStrategy<IStrategyInput[K]>;
};
