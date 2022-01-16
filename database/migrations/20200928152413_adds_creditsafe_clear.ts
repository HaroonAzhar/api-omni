import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.AmlKyc", (table) => {
    table.boolean("CreditsafeClear");
    table.string("CreditsafeClearDetails");
  });
};

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.AmlKyc", (table) => {
    table.dropColumn("CreditsafeClear");
    table.dropColumn("CreditsafeClearDetails");
  });
