import * as Knex from "knex";

import { config } from "./src/db";

export interface KnexFile extends Knex.Config {
  ext: string;
}

module.exports = config as KnexFile;
