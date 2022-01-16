import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.DipSecurity", (table) => {
    table.decimal("ValueExistingMortgage", 38, 4);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.DipSecurity", (table) => {
    table.dropColumn("ValueExistingMortgage");
  });
};
