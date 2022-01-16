import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.decimal("YearsRemainingOnLease", 38, 4);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.dropColumn("YearsRemainingOnLease");
  });
};
