import { ConfigEnvironmentService } from '@modules/core/config-environment/config-environment.service';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = ConfigEnvironmentService.getIns().get<number>('PORT') ?? 3000;
  const app = await NestFactory.create(AppModule);
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
