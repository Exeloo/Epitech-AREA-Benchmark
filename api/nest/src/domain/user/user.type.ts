import { IIdentifiable } from "@domain/common/interfaces/models/identifiable.type";
import { ISoftDeletable } from "@domain/common/interfaces/models/soft-deletable.type";
import { ITimestampable } from "@domain/common/interfaces/models/timestampable.type";

export interface IUser extends IIdentifiable, ITimestampable, ISoftDeletable {
  email: string;
  password: string;
  lastConnection: Date;
}

export type IExposedUser = Pick<IUser, "id" | "email">;
