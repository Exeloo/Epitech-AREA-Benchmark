import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const RestCurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
