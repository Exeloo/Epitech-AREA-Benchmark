import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { USER_PERSISTENCE_REPOSITORY } from "@domain/user/user.repository.type";

import { databaseConfig } from "~/config/database.config";
import { UserEntity } from "~/shared/persistence/typeorm/entities/user.entity";
import { UserRepository } from "~/shared/persistence/typeorm/repositories/user.repository";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => databaseConfig,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    {
      provide: DataSource,
      useFactory: () => new DataSource(databaseConfig).initialize(),
    },
    {
      provide: USER_PERSISTENCE_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_PERSISTENCE_REPOSITORY],
})
export class TypeormModule {}
