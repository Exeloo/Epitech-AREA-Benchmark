import { DataSource } from "typeorm";

import { databaseConfig } from "./database.config";

export default new DataSource({
  ...databaseConfig,
  migrations: [__dirname + "/../shared/persistence/typeorm/migrations/*.ts"],
});
