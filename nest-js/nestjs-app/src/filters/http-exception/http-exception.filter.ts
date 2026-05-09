import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { $ZodIssue } from 'zod/v4/core';
import { ResponseInterface } from '../../interfaces/response/response.interface';

@Catch()
export class HttpExceptionFilter<
  T extends HttpException,
> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus() || 500;

    const res = exception?.getResponse();
    const resAnn =
      res && typeof res === 'object' ? (res as { message: object }) : null;
    const resArr: $ZodIssue[] = Array.isArray(resAnn?.message)
      ? resAnn.message?.map((msg: string) => {
          const path = msg?.split(' ')[0]?.toLowerCase() ?? 'unknown';

          return {
            code: 'custom',
            // path: ['unknown'],
            path: [path],
            message: msg,
          };
        })
      : [];

    // resAnn?.message ?? []
    response.status(status).json({
      success: false,
      message: exception?.message || 'Internal Server Error',
      error: resArr,
    } satisfies ResponseInterface);
  }
}
