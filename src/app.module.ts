import { AuthModule } from '@modules/auth/auth.module';
import { CoreModule } from '@modules/core/core.module';
import { Module } from '@nestjs/common';
import { RepositoryModule } from '@repositories/repository.module';

@Module({ imports: [CoreModule, AuthModule, RepositoryModule] })
export class AppModule {}
