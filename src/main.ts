import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigEnvironmentService } from './common/configs/env/env.service';

async function bootstrap() {
  const PORT = ConfigEnvironmentService.getIns().get<number>('PORT');
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT ?? 3000);
}

bootstrap()
  .then(() => {
    const PORT = ConfigEnvironmentService.getIns().get<number>('PORT');
    console.log(`Application is running on: ${PORT ?? 3000}`);
  })
  .catch((error) => {
    console.error('Error starting the application:', error);
  });
