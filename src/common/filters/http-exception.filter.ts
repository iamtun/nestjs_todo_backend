import { ValidationException } from '@common/pipes/validation-exception.pipe';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HTTP_EXCEPTION_CODE } from '@shared/enums';
import { IErrorResponse } from '@shared/interfaces';

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
    };

    if (exception instanceof ValidationException) {
      errorResponse['errors'] = exception.getResponse();
      errorResponse['message'] = 'Invalid request payload';
      errorResponse['code'] = HTTP_EXCEPTION_CODE.VALIDATION_ERROR;
    } else if (exception instanceof HttpException) {
      errorResponse['errors'] = [];
      errorResponse['message'] = exception.message;
      errorResponse['code'] = HTTP_EXCEPTION_CODE.HTTP_ERROR;
    } else {
      errorResponse['errors'] = [];
      errorResponse['message'] = 'Internal server error';
      errorResponse['code'] = HTTP_EXCEPTION_CODE.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json(errorResponse);
  }
}
