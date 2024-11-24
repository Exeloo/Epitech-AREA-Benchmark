import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { TokenEnum } from "~/shared/auth/services/token/token.enum";
import { TokenPayload } from "~/shared/auth/services/token/token.type";

@Injectable()
export class TokenEncryptor {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  encrypt(payload: TokenPayload, type: TokenEnum = TokenEnum.ACCESS): string {
    try {
      return this.jwtService.sign(payload, {
        secret: this.resolveSecret(type),
        expiresIn: this.resolveExpiration(type),
      });
    } catch (e) {
      throw Error; // @todo Error
    }
  }

  verify(
    token: string,
    type: TokenEnum = TokenEnum.ACCESS,
  ): TokenPayload | null {
    const secret = this.resolveSecret(type);
    try {
      return this.jwtService.verify(token, { secret }) as TokenPayload;
    } catch (e) {
      return null;
    }
  }

  getExpiration(type: TokenEnum): Date {
    return this.calcExpirationTime(this.resolveExpiration(type));
  }

  private resolveSecret(type: TokenEnum): string {
    try {
      switch (type) {
        case TokenEnum.ACCESS:
          return this.configService.getOrThrow("ACCESS_TOKEN_SECRET");
        case TokenEnum.REFRESH:
          return this.configService.getOrThrow("REFRESH_TOKEN_SECRET");
      }
    } catch (e) {
      throw Error; // @todo Error
    }
  }

  private resolveExpiration(type: TokenEnum): string {
    try {
      switch (type) {
        case TokenEnum.ACCESS:
          return this.configService.getOrThrow("ACCESS_TOKEN_SECRET");
        case TokenEnum.REFRESH:
          return this.configService.getOrThrow("REFRESH_TOKEN_SECRET");
      }
    } catch (e) {
      throw Error; // @todo Error
    }
  }

  private calcExpirationTime(expiration: string): Date {
    const time = parseInt(expiration) * 3600 * 1000;
    return new Date(Date.now() + time);
  }
}
