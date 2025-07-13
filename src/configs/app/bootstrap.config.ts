import { HttpExceptionFilter } from '@common/filters';
import { TransformResponseInterceptor } from '@common/interceptors/response.interceptor';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { HTTP_EXCEPTION_CODE } from '@shared/enums';
import {
  I18nValidationException,
  I18nValidationExceptionFilter,
} from 'nestjs-i18n';

export const configApp = (app: INestApplication<any>) => {
  app.setGlobalPrefix('api');
  app.enableVersioning({
    prefix: 'v',
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.useGlobalInterceptors(new TransformResponseInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      exceptionFactory: (errors) => {
        throw new I18nValidationException(errors);
      },
    }),
  );

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new I18nValidationExceptionFilter({
      responseBodyFormatter: (host, exc: I18nValidationException) => {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const validationDetails = exc.errors.map((error) => {
          const messages = Object.values(error.constraints || {});
          const errorMessage = messages.filter(Boolean).join('. ');

          return { field: error.property, error: errorMessage };
        });

        return {
          success: false,
          errors: validationDetails,
          message: 'Invalid request payload',
          code: HTTP_EXCEPTION_CODE.VALIDATION_ERROR,
          data: null,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      },
    }),
  );
};
