import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.boolean("IsOccupiedByBorrower");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.dropColumns("IsOccupiedByBorrower");
  });
};
