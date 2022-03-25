import {
  Connection,
  createConnection,
  getConnection,
  getConnectionManager,
  getRepository,
  ObjectType,
  QueryRunner,
  Repository
} from 'typeorm';

import TYPEORM_CONFIG from '../config/typeorm.config';
import { ConnectionNotFoundError, TransactionNotFoundError } from './errors';

export interface IDatabaseTransaction {
  openTransaction: () => Promise<void>;
  closeTransaction: () => Promise<void>;
  commit: () => Promise<void>;
  rollback: () => Promise<void>;
}

export class TypeormConnection implements IDatabaseTransaction {
  private static instance?: TypeormConnection;

  private query?: QueryRunner;

  private connection?: Connection;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(): TypeormConnection {
    if (TypeormConnection.instance === undefined) TypeormConnection.instance = new TypeormConnection();
    return TypeormConnection.instance;
  }

  async connect(): Promise<void> {
    this.connection = getConnectionManager().has('default') ? getConnection() : await createConnection(TYPEORM_CONFIG);
  }

  async disconnect(): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError();
    await getConnection().close();
    this.query = undefined;
    this.connection = undefined;
  }

  async openTransaction(): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError();
    this.query = this.connection.createQueryRunner();
    await this.query.startTransaction();
  }

  async closeTransaction(): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError();
    await this.query.release();
  }

  async commit(): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError();
    await this.query.commitTransaction();
  }

  async rollback(): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError();
    await this.query.rollbackTransaction();
  }

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    if (this.connection === undefined) throw new ConnectionNotFoundError();
    if (this.query !== undefined) return this.query.manager.getRepository(entity);
    return getRepository(entity);
  }
}
