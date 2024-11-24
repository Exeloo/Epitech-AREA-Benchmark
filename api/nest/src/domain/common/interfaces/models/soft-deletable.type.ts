import { Nullable } from "@type/nullable.type";

export interface ISoftDeletable {
  deletedAt: Nullable<Date>;
}
