import "dotenv/config";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const testDatabaseConfig: DataSourceOptions = {
  type: "mariadb",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? "3000"),
  username: process.env.TEST_DATABASE_USERNAME,
  password: process.env.TEST_DATABASE_PASSWORD,
  database: process.env.TEST_DATABASE_DB,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};
