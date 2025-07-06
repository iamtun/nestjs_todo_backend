import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { IPagination, IResponse } from '@shared/interfaces';
import { isNotEmpty } from 'class-validator';
import { isObject } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((data: T & { pagination?: IPagination }) => {
        const isHasPagination =
          isNotEmpty(data) && isObject(data) && 'pagination' in data;

        if (!isHasPagination) {
          return { success: true, data };
        }

        return { success: true, data, pagination: data.pagination };
      }),
    );
  }
}
