import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("API");

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get("user-agent") ?? "";

    // log infos only if request finished
    response.on("finish", () => {
      const { statusCode } = response;
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
