import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import { utilities as nestWinstonModuleUtilities } from "nest-winston/dist/winston.utilities";
import * as winston from "winston";
import DiscordTransport from "winston-discord-transport";

import { AppEnvEnum } from "~/config/validations/env.validation";

import { LoggerErrorInterceptor } from "./logger/logger-error.interceptor";
import { LoggerInfoInterceptor } from "./logger/logger-info.interceptor";

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const config: { transports: any[] } = {
          transports: [],
        };

        config.transports.push(
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.ms(),
              nestWinstonModuleUtilities.format.nestLike("AREA", {
                colors: true,
                prettyPrint: true,
              }),
            ),
          }),
        );

        if (configService.getOrThrow("APP_ENV") !== AppEnvEnum.LOCAL) {
          config.transports.push(
            new DiscordTransport({
              webhook: configService.getOrThrow("DISCORD_WEBHOOK"),
              defaultMeta: { service: "AREA API" },
              level: "error",
            }),
          );
        }

        return config;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerErrorInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInfoInterceptor,
    },
  ],
})
export class MonitoringModule {}
