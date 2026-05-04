import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Request } from 'express';

export const RawHeaders = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return data ? request.headers[data.toLowerCase()] : request.headers;
  },
);
