import { ValidationException } from '@common/pipes/validation-exception.pipe';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

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

    const errorResponse = {
      success: false,
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    if (exception instanceof ValidationException) {
      errorResponse['errors'] = exception.getResponse();
      errorResponse['errorMessage'] = null;
      errorResponse['errorMessageCode'] = 'VALIDATION_ERROR';
    } else if (exception instanceof HttpException) {
      errorResponse.statusCode = exception.getStatus();
      errorResponse['errors'] = [];
      errorResponse['errorMessage'] = exception.message;
      errorResponse['errorMessageCode'] = 'TEMP_ERROR';
    } else {
      errorResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponse['errors'] = [];
      errorResponse['errorMessage'] = 'Internal server error';
      errorResponse['errorMessageCode'] = 'INTERNAL_SERVER_ERROR';
    }

    response.status(status).json(errorResponse);
  }
}
