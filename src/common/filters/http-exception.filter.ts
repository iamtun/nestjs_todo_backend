import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HTTP_EXCEPTION_CODE } from '@shared/enums';
import { IErrorResponse } from '@shared/interfaces';
import { toString } from 'lodash';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: IErrorResponse = {
      success: false,
      status,
      path: request.url,
      timestamp: new Date().toISOString(),
      errors: [],
      message: '',
      code: '',
      data: null,
    };

    if (exception instanceof HttpException) {
      errorResponse['errors'] = [];
      errorResponse['message'] = exception.message;
      errorResponse['code'] = exception.cause
        ? toString(exception.cause)
        : HTTP_EXCEPTION_CODE.HTTP_ERROR;
    } else {
      errorResponse['errors'] = [];
      errorResponse['message'] = 'Internal server error';
      errorResponse['code'] = HTTP_EXCEPTION_CODE.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json(errorResponse);
  }
}
