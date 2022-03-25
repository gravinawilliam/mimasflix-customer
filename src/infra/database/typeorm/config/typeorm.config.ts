import { ConnectionOptions } from 'typeorm';

import { DatabaseConfig, GlobalConfig } from '@infra/configs/infra.config';

import { CustomerTable } from '../tables/customer.table';

const directory = GlobalConfig.IS_LOCAL ? 'src' : 'dist';

export default {
  name: 'default',
  type: DatabaseConfig.TYPE as any,
  host: DatabaseConfig.HOST,
  port: DatabaseConfig.PORT,
  username: DatabaseConfig.USERNAME,
  password: DatabaseConfig.PASSWORD,
  database: DatabaseConfig.DATABASE,
  entities: [CustomerTable],
  migrations: [`${directory}/infra/database/typeorm/migrations/*.{ts,js}`],
  cli: {
    migrationsDir: `src/infra/database/typeorm/migrations/`,
    entitiesDir: 'src/infra/database/typeorm/tables/'
  }
  // namingStrategy: new SnakeNamingStrategy()
} as ConnectionOptions;
