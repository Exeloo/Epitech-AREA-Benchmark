import { ConfigService } from "@nestjs/config";
import { join } from "path";

import { AppEnvEnum } from "./validations/env.validation";

export const graphqlConfig = (configService: ConfigService) => ({
  autoSchemaFile: join(process.cwd(), "src/schema.gql"),
  sortSchema: true,
  playground: false,
  debug: true,
  introspection: configService.get("APP_ENV") !== AppEnvEnum.PRODUCTION,
  // * Uncomment when implement JSON in node or resolver
  // resolvers: { JSON: GraphQLJSON },
});
