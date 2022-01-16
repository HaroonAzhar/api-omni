import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.DipContactValue", (table) => {
    table.string("MobilePhone");
    table.string("HomePhone");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.DipContactValue", (table) => {
    table.dropColumn("MobilePhone");
    table.dropColumn("HomePhone");
  });
};
