import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import { AuthService } from "~/shared/auth/auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    if (!request.headers) next();
    if (request.headers.authorization) {
      // @ts-ignore
      request.user = await this.authService.verifyToken(
        request.headers.authorization,
      );
    }
    next();
  }
}
