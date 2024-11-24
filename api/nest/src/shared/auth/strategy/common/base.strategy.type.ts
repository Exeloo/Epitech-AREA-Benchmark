import { IUser } from "@domain/user/user.type";

export interface IAuthStrategy<T> {
  authenticate(input: T): Promise<IUser>;
}
