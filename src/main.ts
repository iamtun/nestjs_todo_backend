import { HttpExceptionFilter } from '@common/filters';
import { ValidationException } from '@common/pipes/validation-exception.pipe';
import { ConfigEnvironmentService } from '@modules/core/config-environment/config-environment.service';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = ConfigEnvironmentService.getIns().get<number>('PORT') ?? 3000;
  const app = await NestFactory.create(AppModule);

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

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT);
}

bootstrap()
  .then(() => {
    const PORT = ConfigEnvironmentService.getIns().get<number>('PORT');
    console.log(`Application is running on: ${PORT ?? 3000}`);
  })
  .catch((error) => {
    console.error('Error starting the application:', error);
  });
