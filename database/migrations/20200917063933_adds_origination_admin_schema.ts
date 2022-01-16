import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.raw("CREATE SCHEMA [OriginationAdmin]");
};

exports.down = async (knex: Knex) => {
  await knex.raw("DROP SCHEMA OriginationAdmin");
};
