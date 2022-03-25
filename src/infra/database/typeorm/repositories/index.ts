import { ObjectType, Repository } from 'typeorm';

import { TypeormConnection } from '../helpers/connection';

export abstract class TypeormRepository {
  constructor(private readonly connection: TypeormConnection = TypeormConnection.getInstance()) {}

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity);
  }
}
