import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseInterface } from '../../interfaces/response/response.interface';

@Injectable()
export class ResponsesInterceptor implements NestInterceptor<
  unknown,
  ResponseInterface
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseInterface> {
    return next.handle().pipe(
      map((data: ResponseInterface['data']) => ({
        success: true,
        message: 'Request Successful',
        data,
      })),
    );
  }
}
