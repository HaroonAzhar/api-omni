import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.string("SecurityType");
    table.string("SecurityTypeOther");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.CaseProperty", (table) => {
    table.dropColumns("SecurityType", "SecurityTypeOther");
  });
};
