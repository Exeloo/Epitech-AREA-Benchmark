import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { ThrottlerModule } from "@nestjs/throttler";

import { throttlerConfig } from "~/config/throttler.config";

import { AllExceptionFilter } from "./common/filters/all-exception.filter";
import { GlobalThrottlerGuard } from "./common/guards/global-throttler.guard";
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";
import { GraphqlModule } from "./graphql/graphql.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: throttlerConfig,
    }),
    GraphqlModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GlobalThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class HTTPModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
