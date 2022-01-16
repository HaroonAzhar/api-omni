import Knex from "knex";

import { databaseConf } from "./util/secrets";
import logger from "./util/logger";
export const config = {
  client: "mssql",
  connection: {
    server: databaseConf.host,
    user: databaseConf.username,
    password: databaseConf.password,
    database: databaseConf.database,
    port: databaseConf.port,
    options: {
      encrypt: databaseConf.encrypt,
    },
  },

  pool: {
    min: 0,
    max: 10,
  },

  seeds: {
    directory: "database/seeds",
  },

  migrations: {
    stub: "migration.stub",
    directory: "database/migrations",
  },
} as Knex.Config;
const db = Knex(config);

db.initialize();

db.raw("select 1 + 1 as result")
  .then(() => logger.debug("there is a valid db connection"))
  .catch((error) => {
    logger.error(error);
    throw new Error("Database connection error");
  });

export default db;
