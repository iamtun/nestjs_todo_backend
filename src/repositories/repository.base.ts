import { BASE_ENTITY_DOMAIN } from 'src/shared/constants';
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  InsertResult,
  ObjectId,
  ObjectLiteral,
  QueryRunner,
  Repository,
  SaveOptions,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpsertOptions } from 'typeorm/repository/UpsertOptions';

export class RepositoryBase<Entity extends ObjectLiteral> {
  constructor(protected repository: Repository<Entity>) {}

  createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Entity> {
    const queryBuilder = this.repository.createQueryBuilder(alias, queryRunner);
    const hasDeletedAtColumn = this.repository.metadata.columns.some(
      (column: ColumnMetadata) =>
        column.propertyName === BASE_ENTITY_DOMAIN.BASE_COLUMNS.DELETED_AT,
    );

    if (hasDeletedAtColumn) {
      queryBuilder.where(
        `${alias}.${BASE_ENTITY_DOMAIN.BASE_COLUMNS.DELETED_AT} IS NULL`,
      );
    }
    return queryBuilder;
  }

  insert(
    entity: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[],
  ): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult> {
    return this.repository.update(criteria, partialEntity);
  }

  upsert(
    entityOrEntities:
      | QueryDeepPartialEntity<Entity>
      | QueryDeepPartialEntity<Entity>[],
    conflictPathsOrOptions: string[] | UpsertOptions<Entity>,
  ): Promise<InsertResult> {
    return this.repository.upsert(entityOrEntities, conflictPathsOrOptions);
  }

  delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>,
  ): Promise<DeleteResult> {
    return this.repository.delete(criteria);
  }

  findOne(options: FindOneOptions<Entity>): Promise<Entity | null> {
    return this.repository.findOne(options);
  }

  async findMany(
    options?: FindManyOptions<Entity>,
  ): Promise<{ count?: number; data: Array<Entity> }> {
    const [data, count] = await this.repository.findAndCount(options);
    return { data, count };
  }

  find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(options);
  }

  save<T extends DeepPartial<Entity>>(
    entities: T | T[],
    options?: SaveOptions,
  ): Promise<(T & Entity)[]> {
    const entitiesArray = Array.isArray(entities) ? entities : [entities];
    return this.repository.save(entitiesArray, options);
  }

  softDelete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>,
  ): Promise<UpdateResult> {
    return this.repository.softDelete(criteria);
  }

  rawQuery<TResult = any>(query: string, parameters?: any[]): Promise<TResult> {
    return this.repository.query(query, parameters);
  }

  async exists(options: FindOneOptions<Entity>): Promise<boolean> {
    return await this.repository.exists(options);
  }
}
