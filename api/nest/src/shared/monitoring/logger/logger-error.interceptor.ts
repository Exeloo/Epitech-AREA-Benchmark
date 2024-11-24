import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class LoggerErrorInterceptor implements NestInterceptor {
  private logger = new Logger("API ERROR");

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        return throwError(() => {
          this.logger.error(error);
          return error;
        });
      }),
    );
  }
}
