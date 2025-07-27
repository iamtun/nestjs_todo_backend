import { configApp } from '@config/app';
import { ConfigEnvironmentService } from '@core/config-environment';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = ConfigEnvironmentService.getIns().get<number>('PORT') ?? 3000;
  const app = await NestFactory.create(AppModule);
  configApp(app);
  await app.listen(PORT);

  console.log(`Application is running on: ${PORT}`);
}

bootstrap()
  .then()
  .catch((error) => {
    console.error('Error starting the application:', error);
  });
