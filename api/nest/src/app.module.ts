import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DomainModule } from "@domain/domain.module";

import { ApplicationModule } from "~/application/application.module";
import { MonitoringModule } from "~/shared/monitoring/monitoring.module";

import { validate } from "./config/validations/env.validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    ApplicationModule,
    DomainModule,
    MonitoringModule,
  ],
})
export class AppModule {}
