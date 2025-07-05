import { ConfigEnvironmentService } from '@modules/core/config-environment/config-environment.service';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TYPE_ORM_PG_CONFIG = {
  type: 'postgres',
  host: ConfigEnvironmentService.getIns().get('POSTGRES_HOST') || '127.0.0.1',
  port: Number(ConfigEnvironmentService.getIns().get('POSTGRES_PORT')) || 5432,
  username: ConfigEnvironmentService.getIns().get('POSTGRES_USER') || '',
  password: ConfigEnvironmentService.getIns().get('POSTGRES_PASSWORD') || '',
  database: ConfigEnvironmentService.getIns().get('POSTGRES_DATABASE') || '',
  entities: ['dist/**/*.entity{.ts,.js}', 'dist/**/*/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  timezone: 'Z',
  cli: { migrationsDir: 'migrations' },
  migrationsRun: false,
  logging:
    ConfigEnvironmentService.getIns().get('DEBUG_LOGGING_TYPEORM') === 'true',
  extra: { charset: 'utf8mb4' },
} as TypeOrmModuleOptions;
