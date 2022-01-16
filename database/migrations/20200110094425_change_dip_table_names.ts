import fs from "fs";

import * as Knex from "knex";

exports.up = (knex: Knex) => {
  const sql = fs
    .readFileSync(
      process.cwd() + "/database/migrations/data/rename_dip_tables.sql"
    )
    .toString();
  return knex.raw(sql);
};

exports.down = (knex: Knex) => knex.schema;
