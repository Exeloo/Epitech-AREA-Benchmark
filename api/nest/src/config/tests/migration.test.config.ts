import { DataSource } from "typeorm";
import { testDatabaseConfig } from "./database.test.config";

export default new DataSource({
  ...testDatabaseConfig,
  migrations: [__dirname + "/../shared/persistence/typeorm/migration/*.ts"],
});
