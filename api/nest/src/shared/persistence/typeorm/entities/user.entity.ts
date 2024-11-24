import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Nullable } from "@type/nullable.type";

import { ID } from "@d-type/id.type";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: ID;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastConnection: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Nullable<Date>;
}
