import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from '@v2/utils/pagination';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseDataTransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof Pagination) {
          return data;
        }

        return {
          data,
        };
      })
    );
  }
}
