import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex("Origination.Case").delete().where({ Stage: null, CaseNr: null });
};

exports.down = async (knex: Knex) => knex.schema;
