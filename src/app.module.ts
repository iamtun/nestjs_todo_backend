import { GuardModule } from '@common/guards/guard.module';
import { CoreModule } from '@core/core.module';
import { ApiModule } from '@modules/api.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RepositoryModule } from '@repositories/repository.module';
import { I18nMiddleware } from 'nestjs-i18n';

@Module({ imports: [CoreModule, ApiModule, RepositoryModule, GuardModule] })
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(I18nMiddleware).forRoutes('*');
  }
}
