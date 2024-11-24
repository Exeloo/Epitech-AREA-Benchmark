import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { AUTH_SERVICE } from "@domain/auth/auth.repository.type";

import { PersistenceModule } from "~/shared/persistence/persistence.module";

import { AuthService } from "./auth.service";
import { PasswordEncryptor } from "./services/password/password.encryptor";
import { PasswordService } from "./services/password/password.service";
import { TokenEncryptor } from "./services/token/token.encryptor";
import { TokenService } from "./services/token/token.service";
import { PasswordStrategy } from "./strategy/strategies/password.strategy";
import { TokenStrategy } from "./strategy/strategies/token.strategy";
import { StrategyService } from "./strategy/strategy.service";

@Module({
  imports: [ConfigModule.forRoot(), JwtModule, PersistenceModule],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
    StrategyService,

    PasswordService,
    PasswordEncryptor,

    TokenService,
    TokenEncryptor,

    PasswordStrategy,
    TokenStrategy,
  ],
  exports: [AUTH_SERVICE],
})
export class AuthModule {}
