import { IPasswordStrategy } from "./strategies/password.strategy.type";
import { ITokenStrategy } from "./strategies/token.strategy.type";
import { StrategyEnum } from "./strategy.enum";

export interface IStrategyInput {
  [StrategyEnum.PASSWORD]: IPasswordStrategy;
  [StrategyEnum.TOKEN]: ITokenStrategy;
}
