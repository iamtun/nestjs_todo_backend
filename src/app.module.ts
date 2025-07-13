import { AuthModule } from '@modules/auth/auth.module';
import { CoreModule } from '@modules/core/core.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RepositoryModule } from '@repositories/repository.module';
import { I18nMiddleware } from 'nestjs-i18n';

@Module({ imports: [CoreModule, AuthModule, RepositoryModule] })
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(I18nMiddleware).forRoutes('*');
  }
}
