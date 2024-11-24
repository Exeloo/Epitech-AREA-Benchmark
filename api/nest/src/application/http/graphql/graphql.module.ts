import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { DomainModule } from "@domain/domain.module";

import { AuthResolver } from "~/application/http/graphql/resolvers/auth.resolver";
import { graphqlConfig } from "~/config/graphql.config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: graphqlConfig,
      inject: [ConfigService],
    }),
    DomainModule,
  ],
  providers: [AuthResolver],
})
export class GraphqlModule {}
