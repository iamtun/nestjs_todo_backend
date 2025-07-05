import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPE_ORM_PG_CONFIG } from 'src/utils/configs/db/typeorm.config';

@Module({ imports: [TypeOrmModule.forRoot(TYPE_ORM_PG_CONFIG)] })
export class DatabaseModule {}
