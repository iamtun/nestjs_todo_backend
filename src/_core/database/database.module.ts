import { TYPE_ORM_PG_CONFIG } from '@config/db/typeorm.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forRoot(TYPE_ORM_PG_CONFIG)] })
export class DatabaseModule {}
