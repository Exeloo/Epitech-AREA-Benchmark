import { ID } from "@d-type/id.type";

import { IAuthToken } from "@domain/auth/dto/token.auth.type";
import { IStrategyInput } from "@domain/auth/strategy/strategy.type";
import { IUser } from "@domain/user/user.type";

export const AUTH_SERVICE = "AUTH_SERVICE";

export interface IAuthService {
  authenticate<K extends keyof IStrategyInput>(
    type: K,
    input: IStrategyInput[K],
  ): Promise<IUser>;

  hashPassword(password: string): Promise<string>;

  refreshToken(token: string): Promise<IAuthToken>;

  generateToken(userId: ID): Promise<IAuthToken>;
}
