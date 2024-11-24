import { Args, Query, Resolver } from "@nestjs/graphql";

import { AuthService } from "@domain/auth/auth.service";

import { AuthPasswordInput } from "../dto/input/auth/password/password.auth.input";
import { AuthRefreshTokenInput } from "../dto/input/auth/token/refresh-token.auth.input";
import { AuthTokenResponse } from "../dto/response/auth/token.auth.response";

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthTokenResponse)
  login(@Args("data") data: AuthPasswordInput) {
    return this.authService.login(data);
  }

  @Query(() => AuthTokenResponse)
  refreshToken(@Args("data") data: AuthRefreshTokenInput) {
    return this.authService.refreshToken(data);
  }
}
