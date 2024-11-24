import { Module } from "@nestjs/common";

import { AuthModule } from "~/shared/auth/auth.module";
import { PersistenceModule } from "~/shared/persistence/persistence.module";

import { AuthService } from "./auth/auth.service";
import { UserService } from "./user/user.service";

@Module({
  imports: [AuthModule, PersistenceModule],
  providers: [AuthService, UserService],
  exports: [AuthService, UserService],
})
export class DomainModule {}
