import { HttpExceptionFilter } from '@common/filters';
import { TransformResponseInterceptor } from '@common/interceptors/response.interceptor';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { I18nValidationException } from 'nestjs-i18n';

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
      exceptionFactory: (errors) => new I18nValidationException(errors),
    }),
  );

  app.useGlobalInterceptors(new TransformResponseInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());
};
