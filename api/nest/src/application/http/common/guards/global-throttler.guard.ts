import { ExecutionContext } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ThrottlerGuard } from "@nestjs/throttler";

import { APIEndpointsEnum } from "../enums/api.enum";

@Injectable()
export class GlobalThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const contextType = context.getType<APIEndpointsEnum>();

    if (contextType === APIEndpointsEnum.GraphQL) {
      const gqlCtx = GqlExecutionContext.create(context);
      const ctx = gqlCtx.getContext();
      return { req: ctx.req, res: ctx.req.res };
    }

    const ctx = context.switchToHttp();
    return {
      req: ctx.getRequest(),
      res: ctx.getResponse(),
    };
  }
}
