import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Case", async (table) => {
    table.unique(["CaseNr"]);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Case", async (table) => {
    table.dropUnique(["CaseNr"]);
  });
};
