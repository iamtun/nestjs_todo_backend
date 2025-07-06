import { HttpExceptionFilter } from '@common/filters';
import { TransformResponseInterceptor } from '@common/interceptors/response.interceptor';
import { ValidationException } from '@common/pipes/validation-exception.pipe';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

export const configApp = (app: INestApplication<any>) => {
  app.setGlobalPrefix('api');
  app.enableVersioning({
    prefix: 'v',
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      exceptionFactory: (errors) => new ValidationException(errors),
    }),
  );

  app.useGlobalInterceptors(new TransformResponseInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());
};
