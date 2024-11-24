import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";
import { Request } from "express";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.getArgs();
    if (
      !(
        ctx &&
        ctx.length >= 3 &&
        exception.cause &&
        (exception.cause as string[]).length >= 4
      )
    )
      return;
    const [context, name, code, description] = exception.cause as string[];

    const message = `New error thrown (${code}|${exception.getStatus()}:${name}) at ${context}: ${description}`;
    this.logger.error(message, exception.stack, context);
    const req: Request = ctx[2].req;
    req?.res?.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      timestamp: new Date().toISOString(),
      error: {
        name,
        code: code,
      },
    });
  }
}
