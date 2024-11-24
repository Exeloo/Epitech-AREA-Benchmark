import "dotenv/config";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const databaseConfig: DataSourceOptions = {
  type: "mariadb",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? "3000"),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  poolSize: 20,
};
