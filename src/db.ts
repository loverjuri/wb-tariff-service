import knex from 'knex';
import { config } from './config';

export const db = knex({
  client: 'pg',
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  },
  migrations: {
    directory: '../migrations'
  }
});