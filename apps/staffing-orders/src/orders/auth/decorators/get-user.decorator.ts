import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Request } from 'express'; // Importar el tipo de Express

export const RawHeaders = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>(); // Tipamos la request
    return data ? request.headers[data.toLowerCase()] : request.headers;
  },
);
