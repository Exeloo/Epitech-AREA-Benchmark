import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";

import { APIEndpointsEnum } from "~/application/http/common/enums/api.enum";

export const apiEndpointsLoggers = new Map<APIEndpointsEnum, Logger>([
  [APIEndpointsEnum.GraphQL, new Logger("API (GraphQL)")],
]);

@Injectable()
export class LoggerInfoInterceptor implements NestInterceptor {
  private defaultLogger = new Logger("API");

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const resolverName = context.getClass().name;
    const handler = context.getHandler();
    const methodName = handler.name;

    const logger = apiEndpointsLoggers.get(context.getType<APIEndpointsEnum>());
    (logger ?? this.defaultLogger).log(
      `New call ${resolverName}:${methodName}`,
    );

    return next.handle();
  }
}
